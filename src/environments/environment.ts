// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //local
  // url: 'http://192.168.0.130:3800/api/',
  //url: 'http://localhost:8080/api/',
  //server
  //  url: 'http://35.197.211.133:8080/api/',
  // url: 'https://cors-anywhere.herokuapp.com/http://35.214.92.171:8080/api/',
/*   url: 'https://myraus.com:8282/api/', */
  url: 'https://rausdev.tk:8282/api/',
  // url: 'http://35.214.92.171:8282/api/',


  /* firebase: 
  {
    apiKey: "AIzaSyDMMmvx93kGW0ZiHpkbqFTopre63FHogzE",
    authDomain: "raus-4de7b.firebaseapp.com",
    databaseURL: "https://raus-4de7b.firebaseio.com",
    projectId: "raus-4de7b",
    storageBucket: "raus-4de7b.appspot.com",
    messagingSenderId: "474517791609",
    appId: "1:474517791609:web:81aff774436ec0c00d45a8",
    measurementId: "G-8NV2FVKNJY"
  } */
  firebase:
  {
    apiKey: "AIzaSyCg_0bvL3l8ngTWtHq7XKMYWGcVDN0-Br0",
    authDomain: "raus-dev.firebaseapp.com",
    databaseURL: "https://raus-dev.firebaseio.com",
    projectId: "raus-dev",
    storageBucket: "raus-dev.appspot.com",
    messagingSenderId: "940849416430",
    appId: "1:940849416430:web:050d89da32d27a139dcbff",
    measurementId: "G-FR58CRN1SF"
  } 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
