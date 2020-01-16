import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  	selector: 'app-add-date',
  	templateUrl: './add-date.page.html',
  	styleUrls: ['./add-date.page.scss'],
  	encapsulation: ViewEncapsulation.None
})

export class AddDatePage implements OnInit {
	date;
	time;
	day;

  	constructor(
		private modal: ModalController
	) {}

	ngOnInit() {}

	async getDate(event) {
		var d = new Date(event.detail.value);
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var day = d.getDate();
		this.date = year + '-' + month + '-' + day;
		var da = d.getDay();
		if(da == 1) {
			this.day = 'Lunes';
		} else if(da == 2) {
			this.day = 'Martes';
		} else if(da == 3) {
			this.day = 'Miercoles';
		} else if(da == 4) {
			this.day = 'Jueves';
		} else if(da == 5) {
			this.day = 'Viernes';
		} else if(da == 6) {
			this.day = 'Sabado';
		} else if(da == 7) {
			this.day = 'Domingo';
		}
		console.log('date', this.date)
	}
	
	async getTime(event) {
		var d = new Date(event.detail.value);
		var hours = d.getHours();
		var minutes = d.getMinutes();
		this.time = hours + ':' + minutes; 
		console.log('time', this.time);
	}

	async back() {
		this.modal.dismiss();
	}
	  
	async send() {
		console.log('date', this.date);
		console.log('time', this.time);
		this.modal.dismiss({ date: this.date, time: this.time, day: this.day });
	}
}
