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
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { HttpClientModule } from '@angular/common/http';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

firebase.initializeApp(environment.firebase);

// import { ExpandableComponent } from "./components/expandable/expandable.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddsliderPage } from './pages/modals/addslider/addslider.page';
import { ExcelentePage } from './pages/modals/excelente/excelente.page';
import { ModalPromocionPage } from './pages/modals/modal-promocion/modal-promocion.page';
import { ProductocreadoPage } from './pages/modals/productocreado/productocreado.page';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx'

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoadingService } from './services/loading.service';


@NgModule({
  declarations: [
    AppComponent,
    AddsliderPage,
    ExcelentePage,
    ProductocreadoPage,
    ModalPromocionPage,
    // ExpandableComponent
  ],
  entryComponents: [
    AddsliderPage,
    ExcelentePage,
    ModalPromocionPage,
    ProductocreadoPage,
    // ExpandableComponent
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
    AngularFireDatabaseModule
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
    LoadingService
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
