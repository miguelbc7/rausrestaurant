import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import 'firebase/storage';

@Injectable({
	providedIn: 'root'
})

export class SliderHomeService {
	snapshotChangesSubscription: any;
	base_path = environment.url;
	token:any;

  	constructor(
		private afs: AngularFirestore,
		public afAuth: AngularFireAuth,
		private http: HttpClient,
		private storage: Storage,
		private db: AngularFireDatabase
	) {}
   
  	async create_NewItem(record) {
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		return new Promise<any>((resolve, reject) => {
			let currentUser = firebase.auth().currentUser.uid;

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
				res => resolve(res),
				err => reject(err)
			);

			/* this.afs.collection('restaurantes').doc(currentUser.uid).collection('slider').add(record).then(
				res => resolve(res),
				err => reject(err)
			) */
		});
  	}
 
	read_Items() {
		return new Promise<any>((resolve, reject) => {
			this.afAuth.user.subscribe(currentUser => {
				if(currentUser){
					const promise = this.db.object('restaurantes/' + currentUser.uid + '/slider');
					promise.valueChanges().subscribe( snasphots => {
						console.log(snasphots)
						resolve(snasphots);
					}, error => {
						reject(error);
					});
				}
			});
		});

		/* return new Promise<any>((resolve, reject) => {
			this.afAuth.user.subscribe(currentUser => {
				if(currentUser){
					this.snapshotChangesSubscription = this.afs.collection('restaurantes').doc(currentUser.uid).collection('slider').snapshotChanges();
					resolve(this.snapshotChangesSubscription);
				}
			}, err => reject(err))
		}); */
	}

	getItem(itemID){
		return new Promise<any>((resolve, reject) => {
			this.afAuth.user.subscribe(currentUser => {
				if(currentUser){
					this.snapshotChangesSubscription = this.afs.doc<any>('restaurantes/' + currentUser.uid + '/slider/' + itemID).valueChanges().subscribe(snapshots => {
						resolve(snapshots);
					}, err => {
						reject(err)
					});
				}
			});
		});
	}
 
	update_Item(recordID,record){
		return new Promise<any>((resolve, reject) => {
			let currentUser = firebase.auth().currentUser;
			this.afs.collection('restaurantes').doc(currentUser.uid).collection('slider').doc(recordID).set(record).then(
				res => resolve(res),
				err => reject(err))
		});
	}
 
	async delete_Item(record_id, url) {
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		return new Promise<any>((resolve, reject) => {
			let currentUser = firebase.auth().currentUser.uid;

			let data = {
				id_restaurant: currentUser,
				img: url
			};

			return this.http.put(this.base_path + 'restaurants/delete/slider', JSON.stringify(data), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
				}), params: {
					token: this.token,
				}
			}).subscribe( 
				res => resolve(res),
				err => reject(err)
			);

			/* this.afs.collection('restaurantes').doc(currentUser.uid).collection('slider').doc(record_id).delete().then(
				res => resolve(res),
				err => reject(err)
			) */
		});
	}
}
