import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Restaurant } from '../models/restaurant';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import {  Observable, throwError } from 'rxjs';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  token:string;
  uid;
  
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
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


  constructor(private http: HttpClient, private storage: Storage) { }



  registerUser(value): Observable<Restaurant>{
    console.log(value);
    if(value.categories){
      for (let index = 0; index < value.categories.length; index++) {
        delete value.categories[index].value;
        value.categories[index].name = value.categories[index].display;
        delete value.categories[index].display;
      }
    }
    delete value.address;
    return this.http.post<Restaurant>(`${this.url}restaurants`, JSON.stringify(value), this.httpOptions)
              .pipe(
                  catchError(e => {
                   return throwError(e);
                })
    )
   }
  
   loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.username, value.password)
      .then(
        res => {         
          resolve(res)
        },
        err =>{ console.log('login auth service error'+ err) ; reject(err) })
    })
   }

   getToken(value): Observable<any>{
    return this.http.post(`${this.url}auth/login`, JSON.stringify({uid:value}), this.httpOptions)
    .pipe(
        catchError(e => {
          console.error(e);
          throw new Error(e);
      })
    )
   }
  
   logoutUser(){
     return new Promise((resolve, reject) => {
       if(firebase.auth().currentUser){
         firebase.auth().signOut()
         .then(() => {
           console.log("LOG Out");
           resolve();
         }).catch((error) => {
           reject();
         });
       }
     })
   }
  
   userDetails(){
     return firebase.auth().currentUser;
   }

   async getProfile(): Promise<any> {
    await this.storage.get('_token').then(res=>{
      this.token = res.token;
    });
    await this.storage.get('_uid').then(res=>{
      this.uid = res;
    });
    return this.http.get(this.url+'restaurants/'+this.uid,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token,
      })
    }).pipe(
      catchError(this.handleError)
    );
   }

   async me(): Promise <any>{
    await this.storage.get('_token').then(res=>{
      this.token = res.token;
    });
        return this.http.get(this.url+'auth/me',{
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.token,
          })
        })
        .pipe(
          catchError(this.handleError)
        )
   }

   async updateProfile(item): Promise<any> {
      await this.storage.get('_token').then(res=>{
        this.token = res.token;
      });
      await this.storage.get('_uid').then(res=>{
        this.uid = res;
      });

      let data = {
        uid : this.uid,
        business_name: item.business_name,
        lat: '40',
        lng: '-49.00012',
        phone: item.phone,
        direction: item.address,
      }


        console.log(item);
      return this.http.put<Restaurant>(this.url+'restaurants/update/', JSON.stringify(data),{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token,
        })
      })
      .pipe(
        catchError(this.handleError)
      )
   }

   async updateAvatar(item): Promise<any> {
    await this.storage.get('_token').then(res=>{
      this.token = res.token;
    });
    return this.http.put<Restaurant>(this.url+'users/photo/', JSON.stringify(item),{
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
