import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarlistoPage } from '../agregarlisto/agregarlisto.page';
import { AgregarPage } from '../agregar/agregar.page';

@Component({
  selector: 'app-agregartarjeta',
  templateUrl: './agregartarjeta.page.html',
  styleUrls: ['./agregartarjeta.page.scss'],
})
export class AgregartarjetaPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openAgregarSaldo() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: AgregarPage,
      cssClass: 'sizeModalAgregarProducto'
    });
    await modal.present();
  }

  async openAgregarListo() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: AgregarlistoPage,
      cssClass: 'sizeModalAgregarListo'
    });
    await modal.present();
  }

  // async closeModal() {
  //   await this.modalCtrl.dismiss();
  // }

}
