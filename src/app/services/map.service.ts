import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class MapService {

	token:any ;
  	base_path = environment.url;
  	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': this.token,
		})
	}

  	constructor(
    	private http: HttpClient,

	) {}

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

  	getDireccion(lat:any,long:any,key:any):Observable<any> {
		var dir = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key="+key;
		
		return this.http.get(dir);
	}

	getDireccion2(address,key:any):Observable<any> {
		var dir = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+key;
		
		return this.http.get(dir);
	}
}
