import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Promocion } from '../models/promocion';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})

export class PromocionService {

  	token:any ;
  	base_path = environment.url;

	constructor(
		private http: HttpClient,
		private storage: Storage
	) {}

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': this.token,
		})
	}
 
	handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error.message);
		} else {
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}
		return throwError(
		'Something bad happened; please try again later.');
	};

	async createItem(item): Promise<any> {
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		return this.http.post<Promocion>(this.base_path+'promotions', JSON.stringify(item), {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': this.token,
			})
		}).pipe(
			retry(2),
			catchError(this.handleError)
		)
	}
 
	async getItem(id): Promise<any> {
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		return this.http.get<Promocion>(this.base_path+'promotions/' + id, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': this.token,
			})
		}).pipe(
			retry(2),
			catchError(this.handleError)
		)
	}

	async createPromote(promotion, product): Promise<any> {
		console.log('promotion', promotion);
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		let data = {
			day: (promotion.name).toString(),
			id_promotion: promotion._id,
			id_product: product,
			payment: {
				method: "cash",
				amount: (promotion.price).toString()
			}
		};

		return this.http.post(this.base_path+'products/promotion', JSON.stringify(data),{
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': this.token,
			})
		}).pipe(
			retry(2),
			catchError(this.handleError)
		)
	}
 
	async getList(): Promise<any> {
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		return this.http.get<Promocion>('https://myraus.com:8283/api/promociones', {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': this.token,
			})
		}).pipe(
			retry(2),
			catchError(this.handleError)
		);
	}

	async productPromo(item): Promise<any>{
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		return this.http.put<Promocion>(this.base_path+'products/promotion', JSON.stringify(item), {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': this.token,
			})
		}).pipe(
			retry(2),
			catchError(this.handleError)
		)
	}
 
	async updateItem(id, item): Promise<any> {
		await this.storage.get('_token').then(res=>{
			this.token = res.token;
		});

		return this.http.put<Promocion>(this.base_path+'promotions/' + id, JSON.stringify(item), {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': this.token,
			})
		}).pipe(
			retry(2),
			catchError(this.handleError)
		)
	}
 
	async deleteItem(id) {
		return this.http.delete<Promocion>(this.base_path+'promotions/' + id, this.httpOptions).pipe(
			retry(2),
			catchError(this.handleError)
		)
	}
}
