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

  constructor(private http: HttpClient, private storage: Storage) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    })
  }
 
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    console.log(this.token);
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

   // Create a new item
   async createItem(item): Promise<any> {
     await this.storage.get('_token').then(res=>{
        this.token = res.token;
      });
    return this.http
      .post<Promocion>(this.base_path+'promotions', JSON.stringify(item), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token,
        })
      })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
 
  // Get single Producto data by ID
  async getItem(id): Promise<any> {
    await this.storage.get('_token').then(res=>{
        this.token = res.token;
      });
    return this.http
      .get<Promocion>(this.base_path+'promotions/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token,
        })
      })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
 
  // Get Productos data
  async getList(): Promise<any> {
    await this.storage.get('_token').then(res=>{
        this.token = res.token;
      });
    return this.http
      .get<Promocion>(this.base_path+'promotions', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token,
        })
      })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  async productPromo(item): Promise<any>{
    await this.storage.get('_token').then(res=>{
      this.token = res.token;
    });
    return this.http
      .put<Promocion>(this.base_path+'products/promotion', JSON.stringify(item), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token,
        })
      })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
 
  // Update item by id
  async updateItem(id, item): Promise<any> {
    await this.storage.get('_token').then(res=>{
        this.token = res.token;
      });
    return this.http
      .put<Promocion>(this.base_path+'promotions/' + id, JSON.stringify(item), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token,
        })
      })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
 
  // Delete item by id
  async deleteItem(id) {
    return this.http
      .delete<Promocion>(this.base_path+'promotions/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
