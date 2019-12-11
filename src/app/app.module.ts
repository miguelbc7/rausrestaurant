import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { Joi } from '@joi';

import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

firebase.initializeApp(environment.firebase);

// import { ExpandableComponent } from "./components/expandable/expandable.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddsliderPage } from './pages/modals/addslider/addslider.page';
import { ExcelentePage } from './pages/modals/excelente/excelente.page';
import { ModalPromocionPage } from './pages/modals/modal-promocion/modal-promocion.page';
import { ProductocreadoPage } from './pages/modals/productocreado/productocreado.page';
import { ProductoguardadoPage } from './pages/modals/productoguardado/productoguardado.page';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx'

import * as firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LoadingService } from './services/loading.service';

// import { Welcome1Page } from './pages/welcome1/welcome1.page';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import {NgxMaskIonicModule} from 'ngx-mask-ionic';
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    AddsliderPage,
    ExcelentePage,
    ProductocreadoPage,
    ModalPromocionPage,
    ProductoguardadoPage,
    // Welcome1Page
  ],
  entryComponents: [
    AddsliderPage,
    ExcelentePage,
    ModalPromocionPage,
    ProductocreadoPage,
    ProductoguardadoPage,
    // Welcome1Page
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxMaskIonicModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    File,
    WebView,
    FilePath,
    LoadingService,
    AndroidPermissions,
    LocationAccuracy,
    GoogleMaps,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
