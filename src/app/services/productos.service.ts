import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
	providedIn: 'root'
})

export class ProductosService {
	token:any;
  	uid:any;
  	base_path = environment.url;
  	snapshotChangesSubscription: any;

  	constructor(
		private http: HttpClient,
		private storage: Storage,
		private afs: AngularFirestore,
		public afAuth: AngularFireAuth
	) {}  
 
	handleError(error: HttpErrorResponse) {
		console.error(error);
		console.error(error.error);

		if (error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error.message);
			return throwError(error.error);
		} else {
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`
			);
		}
    	return throwError(error);
  	};

  	async createItem(item, images): Promise<any> {
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		await this.storage.get('_uid').then(res=>{
			this.uid = res;
		});

		delete item.ingredientes;
		delete item.no_ingredientes;
		item.id_restaurant = this.uid;
		item.images = images;

		return this.http.post<Producto>(this.base_path+'products', JSON.stringify(item),{
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}), params: {
				token: this.token,
			}
		}).pipe(
			catchError(this.handleError)
		)
  	}
 
	async getItem(id): Promise<any> {
		await this.storage.get('_uid').then(res=>{
			this.uid = res;
		});

		let data = {
			id_restaurant: this.uid,
			id: id,
		}
		
		return this.http.post<Producto>(this.base_path+'products/get', JSON.stringify(data),{
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
		}).pipe(
			catchError(this.handleError)
		)
	}
 
 	async getList(): Promise<any> {
        await this.storage.get('_token').then(res=>{
          this.token = res.token;
		});
		
        await this.storage.get('_uid').then(res=>{
          this.uid = res;
        });

        let data = {
          id_restaurant: this.uid
		};
		
        return this.http.post<Producto>(this.base_path+'products/list',JSON.stringify( data ), {
        	headers: new HttpHeaders({
          		'Content-Type': 'application/json',
        	}),
      	}).pipe(
        	catchError(this.handleError)
      	)
  	}
 
  	async updateItem(id, item, images): Promise<any> {
		await this.storage.get('_token').then(res=>{
		this.token = res.token;
		});
		
		item._id = id;
		delete item.ingredientes;
		delete item.no_ingredientes;
		item.images = images;

		return this.http.put<Producto>(this.base_path+'products/update', JSON.stringify(item), {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}), params: {
				token: this.token,
			}
		}).pipe(
        	catchError(this.handleError)
      	)
  	}
 
	deleteItem(id, item) {
		return this.http.delete<Producto>(this.base_path+'products/' + id, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}), params: {
				token: this.token,
			}
		}).pipe(
			catchError(this.handleError)
		)
	}

	async uploadImage(id, item): Promise<any>{
		let data = {
			_id : id,
			images: item
		}

		return new Promise<any>((resolve, reject) => {
			let currentUser = firebase.auth().currentUser;
			this.afs.collection('restaurantes').doc(currentUser.uid).collection('productos').add(data).then(
				res => resolve(res),
				err => reject(err)
			)
		})
	}
  
	async uploadItem(id, item): Promise<any>{
		let data = {
			_id : id,
			images: item
		}
		
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		return this.http.put<any>(this.base_path+'products/images',JSON.stringify(data) ,{
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			})
		}).pipe(
			catchError(this.handleError)
		)
	}
  
	updateImagen(id, record): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			let currentUser = firebase.auth().currentUser;
			this.afs.collection('restaurantes').doc(currentUser.uid).collection('productos').doc(id).set(record).then(
				res => resolve(res),
				err => reject(err)
			)
		})
	}

	async deleteImagen(id, image_id): Promise<any> {
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		return new Promise<any>((resolve, reject) => {
			let currentUser = firebase.auth().currentUser.uid;

			let data = {
				_id: id,
				id_imagen: image_id
			};

			return this.http.put(this.base_path + 'products/deleteimage', JSON.stringify(data), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
				}), params: {
					token: this.token,
				}
			}).subscribe( 
				res => resolve(res),
				err => reject(err)
			);

			/* return new Promise<any>((resolve, reject) => {
				let currentUser = firebase.auth().currentUser;
				this.afs.collection('restaurantes').doc(currentUser.uid).collection('productos').doc(id).set(record).then(
					res => resolve(res),
					err => reject(err)
				)
			}) */
		});
	}

	getImagen(id){
		return new Promise<any>((resolve, reject) => {
			this.afAuth.user.subscribe(currentUser => {
				if(currentUser){
					this.snapshotChangesSubscription = this.afs.doc<any>('restaurantes/' + currentUser.uid + '/productos/' + id).valueChanges().subscribe(snapshots => {
						resolve(snapshots);
					}, err => {
						reject(err)
					})
				}
			})
		});
	}
}
