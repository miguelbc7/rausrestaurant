import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregartarjetaPage } from '../agregartarjeta/agregartarjeta.page';
import { AgregarconfirmarPage } from '../agregarconfirmar/agregarconfirmar.page';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openAgregarTarjeta() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: AgregartarjetaPage,
      cssClass: 'sizeModalAgregarTajerta'
    });
    await modal.present();
  }

  async openConfirmarAgregar() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: AgregarconfirmarPage,
      cssClass: 'sizeModalConfirmacion'
    });
    await modal.present();
  }

}
