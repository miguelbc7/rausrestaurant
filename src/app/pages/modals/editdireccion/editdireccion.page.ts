import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-editdireccion',
	templateUrl: './editdireccion.page.html',
	styleUrls: ['./editdireccion.page.scss'],
})

export class EditdireccionPage implements OnInit {

  	constructor(private modalCtrl: ModalController) {}

  	ngOnInit() {}

  	async closeModal() {
    	await this.modalCtrl.dismiss();
  	}
}
