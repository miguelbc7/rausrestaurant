import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})

export class LoadingService {
	isLoading = false;

	constructor(
		public loadingController: LoadingController
	) {}

  	async present(duration) {
		this.isLoading = true;

		return await this.loadingController.create({
			duration: duration?duration:5000,
		}).then(a => {
			a.present().then(() => {
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

	async showLoader(duration:number = 5000) {
		return await this.loadingController.create({
			duration: duration,
		}).then((res) => {
			res.present().then(()=>{
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
			this.loadingController.dismiss();
		}, 1000);
	}
}
