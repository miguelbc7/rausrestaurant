import { Component } from '@angular/core';

import { Platform, ModalController  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Welcome1Page } from './pages/welcome1/welcome1.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    modalCtrl: ModalController
  ) {


    this.initializeApp();


    platform.ready().then(() => {

      statusBar.styleDefault();
    
          const modal = this.modalCtrl.create({
            component: Welcome1Page,
          });
          modal.present();

      // let welcome1 = modalCtrl.create(Welcome1Page);
      // welcome1.present();
  });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }
}
