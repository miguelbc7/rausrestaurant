import { Component, OnInit } from '@angular/core';
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
    ) { }

 async ngOnInit() {
   await this.storage.get('address').then(data=>{
      this.address = data;
      console.log(data);
    })
  }

  async ionViewDidEnter(){
    await this.platform.ready();
    await this.loadMap();
   
  }


  async loadMap() {
    // Environment.setEnv({
    //   API_KEY_FOR_BROWSER_RELEASE: "AIzaSyBUhsxeoY9tYVFFD31lLygBdRROqHU7s6k",
    //   API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBUhsxeoY9tYVFFD31lLygBdRROqHU7s6k"
    // });
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

      // add a marker
      this.map.addMarker({
        position: location.latLng,
        animation: GoogleMapsAnimation.DROP,
        draggable: true,
      }).then(marker =>{
        marker.on(GoogleMapsEvent.MARKER_DRAG_END)
          .subscribe(() => {
            
            this.markerlatlong = marker.getPosition();
            this.geocoderMap(this.markerlatlong);
          });
        });
        
      this.geocoderMap(this.markerlatlong);
    })
    .catch(err => {
      // this.loading.dismiss();
      this.showToast(err.error_message);
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
      this.direccion = results[0];
      this.direccion.extra.lines.pop();
      this.address = this.direccion.extra.lines.join(', ');
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
      console.log('s');
      this.router.navigate(['register1']);
    }
    else if (this.url == 'home'){
      console.log('ss');
      this.authService.updateAddress(this.address);
      this.router.navigate(['home']);
    }
  }

  
  async closeModal() {
    // await this.modalCtrl.dismiss();
    this.url = localStorage.getItem('url');
    if(this.url == 'register'){
      this.router.navigate(['register1']);
    }
    else if (this.url == 'home'){
      this.router.navigate(['home']);
    }
  }

  
  ionViewDidLeave(){
    this.platform.backButton.observers.pop();
  }



  ionViewWillLeave() {

  }


}
