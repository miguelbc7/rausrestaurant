// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //local
  // url: 'http://192.168.0.106:3800/api/',
  // url: 'http://localhost:3800/api/',
  //server
  url: 'http://34.89.86.123:8080/api/',
  firebase: 
  {
    apiKey: "AIzaSyDMMmvx93kGW0ZiHpkbqFTopre63FHogzE",
    authDomain: "raus-4de7b.firebaseapp.com",
    databaseURL: "https://raus-4de7b.firebaseio.com",
    projectId: "raus-4de7b",
    storageBucket: "raus-4de7b.appspot.com",
    messagingSenderId: "474517791609",
    appId: "1:474517791609:web:81aff774436ec0c00d45a8",
    measurementId: "G-8NV2FVKNJY"
  }
  // {
  //   apiKey: "AIzaSyBvwWwuCYxl2BtN4zXwLUnSLNXretVOzEA",
  //   authDomain: "prueba-a4c97.firebaseapp.com",
  //   databaseURL: "https://prueba-a4c97.firebaseio.com",
  //   projectId: "prueba-a4c97",
  //   storageBucket: "prueba-a4c97.appspot.com",
  //   messagingSenderId: "1068631952403",
  //   appId: "1:1068631952403:web:12ee03da9c4f4cbe6583e6"
  // }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
