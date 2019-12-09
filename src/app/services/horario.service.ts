import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Horario } from '../models/horario';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})

export class HorarioService {
	token:any ;
	uid;
	base_path = environment.url;
	private snapshotChangesSubscription: any;

 	constructor(private http: HttpClient, private storage: Storage, private afs: AngularFirestore,public afAuth: AngularFireAuth) { }

	handleError(error: HttpErrorResponse) {
		console.log(error);
		console.log(error.error);
		if (error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error);
		} else {
			if(error.status == 400){
				return throwError(error.error);
			}

			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`
			);
		}

		return throwError(
		'Something bad happened; please try again later.');
	};

	async createItem(item, day): Promise<any> {
		await this.storage.get('_token').then ( res => {
			this.token = res.token;
		});

		await this.storage.get('_uid').then( res => {
			this.uid = res;
		});

		let data = {
			id_restaurant: this.uid,
			schedules:{
				name: day,
				status: true,
				schedules: [/* {
					start: item.schedules[0].start,
					end:item.schedules[0].end
				} */],
			}
		}

		for(let i of item) {
			data.schedules.schedules.push({
				start: i.start,
				end: i.end
			});
		}

		return this.http.post<Horario>(this.base_path+'schedules', JSON.stringify(data), {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
		}).pipe(
			catchError(this.handleError)
		)
	}

	async getItem(name): Promise<any> {
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		return this.http.post<Horario>(this.base_path+'scheduless/day',JSON.stringify({id_restaurant:this.uid, name: name}) ,{
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
			params: {
				token: this.token,
			}
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
        	id_restaurant:this.uid
        };
		
		return this.http.post<Horario>(this.base_path+'scheduless/get',JSON.stringify(data), {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
			params: {
				token: this.token,
			}
     	 }).pipe(
        	catchError(this.handleError)
      	)
  	}

	async updateItem(item, day): Promise<any>{
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});
		
		await this.storage.get('_uid').then(res=>{
			this.uid = res;
		});

		let data = {
			id_restaurant: this.uid,
			schedules:{ 
				name: day,
				status: true,
				schedules:[/*{
					start: item.schedules[0].start,
					end:item.schedules[0].end
				}*/]
			}
		}

		for(let i of item) {
			if(i) {
				data.schedules.schedules.push({
					start: i.start,
					end: i.end,
					id: i.id
				});
			}
		}

		/* if(item.schedules[1]){
			data.schedules.schedules.push({
			start: item.schedules[1].start,
			end:item.schedules[1].end
			});
		} */

		return this.http.put<Horario>(this.base_path+'schedules/update', JSON.stringify(data),{
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}), 
			params: {
				token: this.token,
			}
		}).pipe(
			catchError(this.handleError)
		)
	}

	async deleteItem(id): Promise<any>{
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		await this.storage.get('_uid').then(res=>{
			this.uid = res;
		});
	}

	async statusItem(item): Promise<any>{
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		await this.storage.get('_uid').then(res=>{
			this.uid = res;
		});

		let data = {
			id_restaurant: this.uid,
			status: !item.status,
			name: item.name,
		}

		return this.http.put<Horario>(this.base_path+'schedules/estatus', JSON.stringify(data),{
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
			params: {
				token: this.token,
			}
		});
	}
}
