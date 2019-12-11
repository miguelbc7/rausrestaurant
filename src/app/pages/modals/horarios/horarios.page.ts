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
	status = true;
	list:any;
	errorMessage: any;
	title = 'Agregar';
	id;
	disabled = true;
	hh = '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23';
	hours: any[] = [ { "Lunes": [ { "start": "", "end": "", "icon": false, "disableStart": false, "disableEnd": true, "hourStart": this.hh } ] }, { "Martes": [ { "start": "", "end": "", "icon": false, "disableStart": false, "disableEnd": true, "hourStart": this.hh } ] }, { "Miercoles": [ { "start": "", "end": "", "icon": false, "disableStart": false, "disableEnd": true, "hourStart": this.hh } ] }, { "Jueves": [ { "start": "", "end": "", "icon": false, "disableStart": false, "disableEnd": true, "hourStart": this.hh } ] }, { "Viernes": [ { "start": "", "end": "", "icon": false, "disableStart": false, "disableEnd": true, "hourStart": this.hh } ] }, { "Sabado": [ { "start": "", "end": "", "icon": false, "disableStart": false, "disableEnd": true, "hourStart": 0-24 } ] }, { "Domingo": [ { "start": "", "end": "", "icon": false, "disableStart": false, "disableEnd": true, "hourStart": this.hh } ] } ];
	hour: any[];

	constructor(
		private modalCtrl: ModalController,
		private horarioService: HorarioService,
		private router:Router,
		readonly zone: NgZone
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
			let length = arr.length - 1;
			let h = '';

			let hour = moment(this.hour[length].end).format('HH');

			console.log('hour', hour);

			for(let k = (parseInt(hour)); k <= 23; k++) {
				h = h + ',' + k;
			}

			arr.push({ "start": "", "end": "", "icon": true, "hourStart": h,  "disableStart": false, "disableEnd": true });
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

	async changeStatus() {
		this.zone.run(() => {
			if(this.status == true) {
				this.status = false;
			} else if(this.status == false) {
				this.status = true;
			}
		});

		console.log(this.status);
	}

	async createForm() {
		if(this.title == 'Agregar') {
			this.horarioService.createItem(this.hour, this.name, this.status).then(res => {
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
			this.horarioService.updateItem(this.hour, this.name, this.status).then(res =>{
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
				console.log('data', data);
				if(data.schedules.schedules) {
					this.title = 'Editar';
					let schedules = data.schedules.schedules;
					this.status = data.schedules.status;
					let arr = [];
					schedules.forEach( (row, i) => {
						if( i == 0) {
							var ico = false;
						} else {
							var ico = true;
						}

						let a = { start: row.start, end: row.end, icon: ico, id: row.id, disabledStart: false, disabledEnd: false };
						arr.push(a);
					});

					this.hour = arr;
					
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

	validar(i, type) {
		if(type == 'start') {
			if(i != 0) {
				var j = i -1;
			}

			if(j == undefined) {
				var h = '';
				var hou;
				var minute =  moment(this.hour[i].start).format('mm');

				if(minute == '0' || minute == '00') {
					hou = parseInt(moment(this.hour[i].start).format('HH'));
				} else if(minute == '15') {
					hou = parseInt(moment(this.hour[i].start).format('HH'));
				} else if(minute == '30') {
					hou = parseInt(moment(this.hour[i].start).format('HH'));
				} else if(minute == '45') {
					hou = parseInt(moment(this.hour[i].start).add(1, 'hours').format('HH'));
				}

				for(let k = parseInt(hou); k <= 23; k++) {
					h = h + ',' + k;
				}

				h = h.replace(/^,*|,(?=,)|,$/g, '');
	
				this.hour[i].hourEnd = h;
				this.hour[i].disableEnd = false;
			} else {
				var h = '';
				var hou;
				var minute =  moment(this.hour[i].start).format('mm');

				let hour1 = moment(this.hour[j].end).format('HH:mm');
				let hou1 = moment(this.hour[j].end).format('HH');
				let minute1 = moment(this.hour[j].end).format('mm');
				let hour2 = moment(this.hour[i].start).format('HH::mm');
				let hou2 = moment(this.hour[i].start).format('HH');
				let minute2 = moment(this.hour[i].start).format('mm');

				if(minute2 == '45') {
					if(parseInt(hou1) == parseInt(hou2) && parseInt(minute1) >= parseInt(minute2)) {
						hou2 = moment(hou2 + ':' + 0).add(1, 'hour').format('HH:mm');
						var date = new Date();
						var year = date.getFullYear();
						var month = date.getMonth();
						var day = date.getDate();
						var d = year + '-' + month + '-' + day + ' ' + hou2;
						this.hour[i].start = (new Date(d)).toString();
						hou = parseInt(moment(this.hour[i].start).format('HH'));
					} else {
						hou2 = moment(hou2 + ':' + 0).format('HH:mm');
						var date = new Date();
						var year = date.getFullYear();
						var month = date.getMonth();
						var day = date.getDate();
						var d = year + '-' + month + '-' + day + ' ' + hou2;
						this.hour[i].start = (new Date(d)).toString();
						hou = parseInt(moment(this.hour[i].start).format('HH'));
					}
				} else {
					if(parseInt(hou1) == parseInt(hou2) && parseInt(minute1) >= parseInt(minute2)) {
						hou2 = moment(this.hour[i].start).add(15, 'minutes').format('HH:mm');
						var date = new Date();
						var year = date.getFullYear();
						var month = date.getMonth();
						var day = date.getDate();
						var d = year + '-' + month + '-' + day + ' ' + hou2;
						this.hour[i].start = (new Date(d)).toString();
						hou = parseInt(moment(this.hour[i].start).format('HH'));
					} else {
						hou2 = moment(this.hour[i].start).format('HH:mm');
						var date = new Date();
						var year = date.getFullYear();
						var month = date.getMonth();
						var day = date.getDate();
						var d = year + '-' + month + '-' + day + ' ' + hou2;
						this.hour[i].start = (new Date(d)).toString();
						hou = parseInt(moment(this.hour[i].start).format('HH'));
					}
				}

				for(let k = parseInt(hou); k <= 23; k++) {
					h = h + ',' + k;
				}

				h = h.replace(/^,*|,(?=,)|,$/g, '');

				this.hour[i].hourEnd = h;
				this.hour[i].disableEnd = false;
			}
		} else if(type == 'end') {
			let hour1 = moment(this.hour[i].start).format('HH:mm');
			let hou1 = moment(this.hour[i].start).format('HH');
			let minute1 = moment(this.hour[i].start).format('mm');
			let hour2 = moment(this.hour[i].end).format('HH::mm');
			let hou2 = moment(this.hour[i].end).format('HH');
			let minute2 = moment(this.hour[i].end).format('mm');

			if(minute1 == '45') {
				if(parseInt(hou1) == parseInt(hou2)) {
					if(parseInt(minute1) >= parseInt(minute2)) {
						hou2 = moment(hou2 + ':' + 0).add(1, 'hour').format('HH:mm');
						var date = new Date();
						var year = date.getFullYear();
						var month = date.getMonth();
						var day = date.getDate();
						var d = year + '-' + month + '-' + day + ' ' + hou2;
						this.hour[i].end = (new Date(d)).toString();
					}
				}
			} else {
				if(parseInt(hou1) == parseInt(hou2)) {
					if(parseInt(minute1) >= parseInt(minute2)) {
						var difference = Math.abs(parseInt(minute1) - parseInt(minute2));
						console.log('difference', difference);
	
						if(difference == 0) {
							hou2 = moment(this.hour[i].end).add(15, 'minutes').format('HH:mm');
							var date = new Date();
							var year = date.getFullYear();
							var month = date.getMonth();
							var day = date.getDate();
							var d = year + '-' + month + '-' + day + ' ' + hou2;
							this.zone.run(() => {
								this.hour[i].end = hou2;
								this.hour[i].end = (new Date(d)).toString();
							});
						} else if(difference == 15) {
							hou2 = moment(this.hour[i].end).add(30, 'minutes').format('HH:mm');
							var date = new Date();
							var year = date.getFullYear();
							var month = date.getMonth();
							var day = date.getDate();
							var d = year + '-' + month + '-' + day + ' ' + hou2;
							this.zone.run(() => {
								this.hour[i].end = (new Date(d)).toString();
							});
						} else if(difference == 30) {
							hou2 = moment(this.hour[i].end).add(45, 'minutes').format('HH:mm');
							var date = new Date();
							var year = date.getFullYear();
							var month = date.getMonth();
							var day = date.getDate();
							var d = year + '-' + month + '-' + day + ' ' + hou2;
							this.zone.run(() => {
								this.hour[i].end = (new Date(d)).toString();
							});
						} else if(difference == 45) {
							hou2 = moment(this.hour[i].end).add(60, 'minutes').format('HH:mm');
							var date = new Date();
							var year = date.getFullYear();
							var month = date.getMonth();
							var day = date.getDate();
							var d = year + '-' + month + '-' + day + ' ' + hou2;
							this.zone.run(() => {
								this.hour[i].end = (new Date(d)).toString();
							});
						}
					}
				}
			}
		}

		/* if(i == 0) {
			if(type == 'start') {
				
			} else if(type == 'end') {

			}
		} else if(i == 1) {

		} else if(i == 2) {
			
		} else if(i == 3) {
			
		} else if(i == 4) {
			
		} */

		/* let start =  moment(this.start).format('HH:mm');
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
		} */
	}
}
