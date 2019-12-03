import { Component, OnInit } from '@angular/core';
import {ModalController  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-welcome1',
  templateUrl: './welcome1.page.html',
  styleUrls: ['./welcome1.page.scss'],
})
export class Welcome1Page implements OnInit {

  constructor(modalCtrl: ModalController, public splashScreen: SplashScreen) { }

  ngOnInit() {
  }

  ionViewDidEnter() {

    this.splashScreen.hide();

    setTimeout(() => {
      // this.modalCtrl.dismiss();
    }, 4000);

  }

}
