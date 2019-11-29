import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;

  constructor(public loadingController: LoadingController) { }

  async present(duration) {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: duration,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  async showLoader() {
   return await this.loadingController.create({
      // message: 'This Loader will Not AutoHide'
      duration: 20000,
    }).then((res) => {
      res.present().then(()=>{
        // this.hideLoader();
        console.log('present');
      });
 
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
        this.hideLoader();
      });
    });
  }
 
  async hideLoader() {
    console.log('hide');
    return await setTimeout(() => {
      console.log('dismmiss');
     this.loadingController.dismiss();
    }, 1000);
  }
}
