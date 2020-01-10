import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

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
	favorites: any[];

	constructor(
		private db: AngularFireDatabase,
		private storage: Storage,
		private http: HttpClient
	) {}

  	ngOnInit() {
    	var segment = document.querySelector('ion-segment');
    	var slides = document.querySelector('ion-slides');
    	var status;
    
    	segment.addEventListener('ionChange', (ev) => onSegmentChange(ev));
    	slides.addEventListener('ionSlideDidChange', (ev) => onSlideDidChange(ev));

    	function onSegmentChange(ev) {
      		slideTo(ev.detail.value);
    	}

    	function slideTo(index) {
      		slides.slideTo(index);
    	}

    	async function onSlideDidChange(ev) {
      		var index = await slides.getActiveIndex();
      		clickSegment(index);
    	}

	    function clickSegment(index) {
    		status = index;
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
			var itemsRef2 = this.db.list('notifications/' + uid);
		
			itemsRef.snapshotChanges(['child_added']).subscribe(actions => {
				var array = [];

				actions.forEach((action, i) => {
					array.push(action.payload.val());
				});

				this.notifications = array;
			});

			this.db.list('notifications/' + uid, ref => ref.orderByChild('like').equalTo(true)).snapshotChanges(['child_added']).subscribe(actions => {
				var array2 = [];

				actions.forEach((action, i) => {
					array2.push(action.payload.val());
				});

				this.favorites = array2;
			});
		});
	}

	like(id, value) {
		/* await this.storage.get('_uid').then(res=>{
			var uid = res;

			let data = {
				id_restaurant: currentUser,
				img: record
			};

			return this.http.put(this.base_path + 'restaurants/update/slider', JSON.stringify(data), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
				}), params: {
					token: this.token,
				}
			}).subscribe( 
				res => (res),
				err => (err)
			);
		}); */
	}
}
