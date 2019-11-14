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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
