import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Restaurant } from '../models/restaurant';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import {  Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  
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


  constructor(private http: HttpClient) { }



  registerUser(value): Observable<Restaurant>{
    return this.http.post<Restaurant>(`${this.url}restaurants`, JSON.stringify(value), this.httpOptions)
              .pipe(
                  catchError(e => {
                    throw new Error(e);
                    console.log('registerUser error: '+e);
                })
    )
   }
  
   loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.username, value.password)
      .then(
        res => {
          let _token = this.http.post(`${this.url}auth/login`,res).pipe(
            catchError(e => {
              console.log(e.error.msg);
              throw new Error(e);
            })
          );          
          resolve(res)
        },
        err =>{ console.log('login auth service error'+ err) ; reject(err) })
    })
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
}
