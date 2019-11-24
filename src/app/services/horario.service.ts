import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Horario } from '../models/horario';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  token:any ;
  uid;
  base_path = environment.url;

  constructor(private http: HttpClient, private storage: Storage) { }

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
     await this.storage.get('_uid').then(res=>{
        this.uid = res;
      });
      let data = {
        id_restaurant: this.uid,
        schedules:[{
          name: item.name,
          status: item.schedules.status,
          schedules: {
            start: item.schedules.start,
            end:item.schedules.end
          }
        }]
      }
      return this.http
        .post<Horario>(this.base_path+'schedules', JSON.stringify(data),{
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
  async getItem(name): Promise<any> {
    await this.storage.get('_token').then(res=>{
      this.token = res.token;
    });
    return this.http
      .get<Horario>(this.base_path+'schedule', {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
    }),
    params: {name: name}
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
        await this.storage.get('_uid').then(res=>{
          this.uid = res;
        });
        return this.http
          .get<Horario>(this.base_path+'schedules', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token,
        }),
        params: {id_restaurant: this.uid}
      })
      .pipe(
        catchError(this.handleError)
      )
  }
 
}
