import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-notificaciones',
  	templateUrl: './notificaciones.page.html',
  	styleUrls: ['./notificaciones.page.scss'],
  	encapsulation: ViewEncapsulation.None
})

export class NotificacionesPage implements OnInit {

	title = "Notificaciones";
	imgStatus = 1;
	notifications: any[];

	constructor(
		private db: AngularFireDatabase,
		private storage: Storage
	) {}

  	ngOnInit() {
    	var segment = document.querySelector('ion-segment');
    	var slides = document.querySelector('ion-slides');
    	var status;
    
    	segment.addEventListener('ionChange', (ev) => onSegmentChange(ev));
    	slides.addEventListener('ionSlideDidChange', (ev) => onSlideDidChange(ev));

    	// On Segment change slide to the matching slide
    	function onSegmentChange(ev) {
      		slideTo(ev.detail.value);
    	}

    	function slideTo(index) {
      		slides.slideTo(index);
    	}

    	// On Slide change update segment to the matching value
    	async function onSlideDidChange(ev) {
      		var index = await slides.getActiveIndex();
      		clickSegment(index);
    	}

	    function clickSegment(index) {
    		status = index;
      		console.log(status);
		}
		
		this.getNotifications();
	}
	  
	changeTitle(data) {
		this.title = data;

		if(data === 'Notificaciones') {
			this.imgStatus = 1;
		} else if(data == 'Favoritos') {
			this.imgStatus = 2;
		}
	}

	async getNotifications() {

		await this.storage.get('_uid').then(res=>{
			var uid = res;

			var itemsRef = this.db.list('notifications/' + uid);
		
			itemsRef.snapshotChanges(['child_added']).subscribe(actions => {
				var array = [];
				var array2 = [];

				actions.forEach((action, i) => {
				/* 	console.log(action.type);
					console.log(action.key);
					console.log(action.payload.val()); */
					array.push(action.payload.val());
					console.log('payload', action.payload.val());
					console.log('payload', action.payload.val()[i].like);

					/* if(action.payload.val()) {

					} */
				});

				console.log('array', array);
				this.notifications = array;
			});
		});
	}
}
