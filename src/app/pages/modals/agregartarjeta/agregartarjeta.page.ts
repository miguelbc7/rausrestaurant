import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarlistoPage } from '../agregarlisto/agregarlisto.page';

@Component({
  selector: 'app-agregartarjeta',
  templateUrl: './agregartarjeta.page.html',
  styleUrls: ['./agregartarjeta.page.scss'],
})
export class AgregartarjetaPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openAgregarListo() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: AgregarlistoPage,
      cssClass: 'sizeModalAgregarListo'
    });
    await modal.present();
  }

}
