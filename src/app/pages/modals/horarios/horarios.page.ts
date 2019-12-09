import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HorarioService } from '../../../services/horario.service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import * as moment from "moment"; 
import { scheduled } from 'rxjs';

@Component({
	selector: 'app-horarios',
	templateUrl: './horarios.page.html',
	styleUrls: ['./horarios.page.scss'],
})

export class HorariosPage implements OnInit {
	@Input() name;
	start;
	end;
	start2;
	end2;
	status = false;
	list:any;
	errorMessage: any;
	title = 'Agregar';
	id;
	disabled = true;
	hours: any[] = [ { "Lunes": [ { "start": "", "end": "", "icon": false } ] }, { "Martes": [ { "start": "", "end": "", "icon": false } ] }, { "Miercoles": [ { "start": "", "end": "", "icon": false } ] }, { "Jueves": [ { "start": "", "end": "", "icon": false } ] }, { "Viernes": [ { "start": "", "end": "", "icon": false } ] }, { "Sabado": [ { "start": "", "end": "", "icon": false } ] }, { "Domingo": [ { "start": "", "end": "", "icon": false } ] } ];
	hour: any[];

	constructor(
		private modalCtrl: ModalController,
		private horarioService: HorarioService,
		private router:Router,
		private zone: NgZone
	) {}

	ngOnInit() {
		this.hour = this.hours[0]['Lunes'];
		this.getHorario();
	}

	async closeModal() {
		await this.modalCtrl.dismiss();
	}

	async addNewHour() {
		let arr = this.hour;

		if(arr.length <= 4) {
			arr.push({ "start": "", "end": "", "icon": true });
			this.hour = arr;
		} else {
			console.log('error');
		}
	}

	async removeHour(index) {
		let arr = this.hour;
		arr.splice(index, 1);
		this.hour = arr;
	}

	async createForm() {
		if(this.title == 'Agregar') {
			this.horarioService.createItem(this.hour, this.name).then(res => {
				res.subscribe(() => {
					this.modalCtrl.dismiss();
					this.errorMessage = '';
					this.router.navigate(['home']);
				}, error => {
					console.log(error);
					this.errorMessage = error.error;
				});
			}).catch(err => console.error(err));
		} else if(this.title == 'Editar') {
			console.log('schedules', this.hour);
			this.horarioService.updateItem(this.hour, this.name).then(res =>{
				res.subscribe(() =>{
					this.modalCtrl.dismiss();
					this.errorMessage = '';
					this.router.navigate(['home']);
				}, error=>{
					console.log(error);
					this.errorMessage = error.error;
				});
			}).catch(err => console.error(err));
		}
	}

	async getHorario() {
		await this.horarioService.getItem(this.name).then( res => {
			res.subscribe( data => {
				if(data.schedules.schedules) {
					this.title = 'Editar';
					let schedules = data.schedules.schedules;
					let arr = [];
					schedules.forEach( (row, i) => {
						if( i == 0) {
							var ico = false;
						} else {
							var ico = true;
						}

						let a = { start: row.start, end: row.end, icon: ico, id: row.id };
						arr.push(a);
					});

					this.hour = arr;
					
					console.log('hour', this.hour);
					/* this.status = data.schedules.status; */
					/* this.start = schedules[0].start;
					this.end = schedules[0].end; */

					/* if(schedules[1]) {
						this.start2 = schedules[1].start;
						this.end2 = schedules[1].end;
					} */
				} else {
					this.title = "Agregar"
				}
			});
		});
	}

	statusItem() {
		let data = {
			status: this.status,
			name: this.name,
		}

		if(this.title == 'Editar'){
			this.horarioService.statusItem(data).then(res=>{
				res.subscribe(data =>{})
			}, err =>{
				console.error(err);
			});
		}
	}

	validar() {
		let start =  moment(this.start).format('HH:mm');
		let start2 =  moment(this.start2).format('HH:mm');
		let end =  moment(this.end).format('HH:mm');
		let end2 =  moment(this.end2).format('HH:mm');

		if(this.start && this.end && this.start2 && this.end2) {
			if(start < end && start2 >= start && start2 < end && start2 < end2) {
				this.disabled = true;
			} else if(start < end && end2 > start && end2 <= end && start2 < end2) {
				this.disabled = true;
			} else if(start < end && start >= start2 && start < end2 && start2 < end2) {
				this.disabled = true;
			} else if(start < end && end > start2 && end <= end2 && start2 < end2) {
				this.disabled = true;
			} else if(start >= end || start2 >= end2) {
				this.disabled = true;
			} else {
				this.disabled = false;
			}
		} else if(this.start && this.end && this.start2) {
			this.disabled = true;
		} else if(this.start && this.end && this.end2) {
			this.disabled = true;
		} else if(this.start2 && this.end2 && this.start) {
			this.disabled = true;
		} else if(this.start2 && this.end2 && this.end) {
			this.disabled = true;
		} else if(this.start && this.end) {
			this.disabled = false;
		} else if(this.start2 && this.end2) {
			this.disabled = false;
		}
	}
}
