import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Producto } from '../models/producto';
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
   createItem(item): Observable<Producto> {
    return this.http
      .post<Producto>(this.base_path+'promotions', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
 
  // Get single Producto data by ID
  getItem(id): Observable<Producto> {
    return this.http
      .get<Producto>(this.base_path+'promotions/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
 
  // Get Productos data
  getList(): Observable<Producto> {
    return this.http
      .get<Producto>(this.base_path+'promotions', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
 
  // Update item by id
  updateItem(id, item): Observable<Producto> {
    return this.http
      .put<Producto>(this.base_path+'promotions/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
 
  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<Producto>(this.base_path+'promotions/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
