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
export class ProductosService {

  token:any ;
  base_path = environment.url;


  constructor(private http: HttpClient, private storage: Storage) { 
  }  
 
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    console.log(error);
    console.log(error.error);
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
    delete item.ingredientes;
    delete item.no_ingredientes;
    return this.http
      .post<Producto>(this.base_path+'products', JSON.stringify(item),{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token,
        })
      })
      .pipe(
        catchError(this.handleError)
      )
  }
 
  // Get single Producto data by ID
  getItem(id): Observable<Producto> {
    return this.http
      .get<Producto>(this.base_path+'products/' + id, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    })
  })
      .pipe(
        catchError(this.handleError)
      )
  }
 
  // Get Productos data
 async getList(): Promise<any> {
        await this.storage.get('_token').then(res=>{
          this.token = res.token;
        });
        return this.http
          .get<Producto>(this.base_path+'products', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token,
        })
      })
      .pipe(
        catchError(this.handleError)
      )
  }
 
  // Update item by id
  updateItem(id, item): Observable<Producto> {
    return this.http
      .put<Producto>(this.base_path+'products/' + id, JSON.stringify(item), {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    })
  })
      .pipe(
        catchError(this.handleError)
      )
  }
 
  // Delete item by id
  deleteItem(id, item) {
    return this.http
      .delete<Producto>(this.base_path+'products/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token,
        })
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  async uploadItem(id, item): Promise<any>{
    let data = {
      _id : id,
      image: item
    }
    await this.storage.get('_token').then(res=>{
        this.token = res.token;
      });
      return this.http
        .post<any>(this.base_path+'products/images',JSON.stringify(data) ,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token,
      })
    })
    .pipe(
      catchError(this.handleError)
    )
  }

}
