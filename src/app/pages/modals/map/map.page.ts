import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Geocoder,
  GeocoderResult,
  Environment
} from '@ionic-native/google-maps';
import {
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map: GoogleMap;
  loading: any;
  address;
  markerlatlong;
  direccion;
  url;

  constructor(
    private modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform,
    private router: Router,
    private storage: Storage,
    private authService: AuthService,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    readonly ngZone: NgZone
    ) { }

 async ngOnInit() {

  this.url = localStorage.getItem('url');
    if(this.url == 'register'){
      await this.storage.get('address').then(data=>{
        this.address = data;
        console.log(data);
      }).catch( error => {
        this.address = localStorage.getItem('street');
      });
    }else if(this.url == 'home'){
     this.address = localStorage.getItem('street');
    }
  await this.platform.ready().then(()=>{
    this.checkGPSPermission();
  });
  //  await this.loadMap();

  }

  async ionViewDidEnter(){
    
   
  }


  async loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyBUhsxeoY9tYVFFD31lLygBdRROqHU7s6k",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBUhsxeoY9tYVFFD31lLygBdRROqHU7s6k"
    });
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });
    await this.mapStart();
  }
  async mapStart() {
    this.map.clear();

    // this.loading = await this.loadingCtrl.create({
    //   message: 'Por favor espera un momento...'
    // });
    // await this.loading.present();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      // this.loading.dismiss();
      console.log(JSON.stringify(location, null ,2));
      this.markerlatlong = location.latLng;
      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });

      this.map.on(GoogleMapsEvent.MAP_CLICK)
      .subscribe((result) => {

        console.log('result', result);

        this.addMarker(result[0]);
        this.geocoderMap(result[0]);
        /* this.markerlatlong = marker.getPosition();
        console.log('pos: ' + this.markerlatlong);

        marker.getPosition().then( latlong => {
            console.log('pos2: ' + latlong);
        });
        marker.setPosition(this.markerlatlong);
        this.geocoderMap(this.markerlatlong); */
      });

      this.addMarker(location.latLng)
      this.geocoderMap(location.latLng);
    })
    .catch(err => {
      // this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  async addMarker(latLng) {
    // add a marker
    console.log(latLng);
    this.map.clear().then(() => {
      this.map.addMarker({
        position: latLng,
        animation: GoogleMapsAnimation.DROP,
      }).then(marker =>{
          console.log('marker', marker);
        /* marker.on(GoogleMapsEvent.MARKER_DRAG_END) */
          marker.on(GoogleMapsEvent.MAP_CLICK)
          .subscribe(() => {
            alert('map click');
            this.markerlatlong = marker.getPosition();
            console.log('pos: ' + this.markerlatlong);
            this.geocoderMap(this.markerlatlong);
          });
  
         /*  marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            console.log('marker click')
          }); */
        });
    });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

 async geocoderMap(latlng){
    console.log(latlng);
    // this.loading = await this.loadingCtrl.create({
      // message: 'Por favor espera un momento...'
    // });
    // await this.loading.present();
    let options = {
      position: latlng
    };
   await Geocoder.geocode(options).then( (results: GeocoderResult[])=>{
      console.log('geocoderResult', results[0]);
      this.direccion = results[0];
      console.log('thisDirecion', this.direccion);
      this.direccion.extra.lines.pop();
      results[0].extra.lines.pop();

      if(results[0].subThoroughfare) {
        var subThoroughfare = results[0].subThoroughfare;
      } else {
        var subThoroughfare = '';
      }

      if(results[0].thoroughfare) {
        var thoroughfare = results[0].thoroughfare;
      } else {
        var thoroughfare = '';
      }

      if(results[0].locality) {
        var locality = results[0].locality;
      } else {
        var locality = '';
      }

      if(results[0].subAdminArea) {
        var subAdminArea = results[0].subAdminArea;
      } else {
        var subAdminArea = '';
      }

      if(results[0].adminArea) {
        var adminArea = results[0].adminArea;
      } else {
        var adminArea = '';
      }

      this.ngZone.run(() => {
        // changes will be detected because we are in a zone.
        this.address =  subThoroughfare + ' ' + thoroughfare + ' ' + locality + ' ' + subAdminArea + ' ' + adminArea;
      });
      console.log('thisAddress', this.address);
      // this.address = this.direccion.extra.lines.join(', ');
      // this.loading.dismiss();
    }).catch(error =>{
      // this.loading.dismiss();
      console.error(error);
      this.showToast(error.error_message);
    })
    
    // await this.loading.dismiss();
  }

  save()
  {
    this.direccion.street = this.address;
    console.log(this.direccion);
    this.storage.set('direction',this.direccion);

    this.url = localStorage.getItem('url');
    console.log(this.url);
    if(this.url == 'register'){
      this.router.navigate(['register1']);
    }
    else if (this.url == 'home'){
      console.log('ss');
      this.authService.updateAddress(this.direccion).then((res) => {
        res.subscribe(res => {
          console.log(res);
          this.platform.backButton.observers.pop();
          this.router.navigate(['home']);
        },
        err =>{
          console.error(err);
        })
      }).catch(error => {
        console.error(error);
      });
    }
  }

  
  async closeModal() {
    // await this.modalCtrl.dismiss();
    this.platform.backButton.observers.pop();
    if(this.url == 'register'){
      this.router.navigate(['register1']);
    }
    else if (this.url == 'home'){
      this.router.navigate(['home']);
    }
  }

  
  ionViewDidLeave(){
    
  }



  ionViewWillLeave() {
    // this.platform.backButton.observers.pop();
  }

 async checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
  
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
  
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        console.error(err);
      }
    );
  }
  //////////////// GPS GOOGLE MAP /////////////////////
 async requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              console.error('requestPermission Error requesting location permissions 1' + error)
            }
          );
      }
    });
  }
 async askToTurnOnGPS() {
   await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.loadMap();
      },
      error => console.error('Error requesting location permissions 2' + JSON.stringify(error))
    );
  }
  

}
