import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;

  constructor(public loadingController: LoadingController) { }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 5000,
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
    }).then((res) => {
      res.present().then(()=>{
        // this.hideLoader();
        console.log('present');
      });
 
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
        this.loadingController.dismiss();
      });
    });
  }
 
  async hideLoader() {
    console.log('hide');
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);
  }
}
