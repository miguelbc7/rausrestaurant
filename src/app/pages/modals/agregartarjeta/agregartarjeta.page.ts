import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarlistoPage } from '../agregarlisto/agregarlisto.page';
import { AgregarPage } from '../agregar/agregar.page';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-agregartarjeta',
  templateUrl: './agregartarjeta.page.html',
  styleUrls: ['./agregartarjeta.page.scss'],
})
export class AgregartarjetaPage implements OnInit {

  numero;
  nombre;
  cvc;
  fechaExp;

  constructor(private modalCtrl: ModalController, private creditCardService:CreditCardService) { }

  ngOnInit() {
  }

  async openAgregarSaldo() {

    let record = {};
    record['nombre'] = this.nombre;
    record['numero'] = this.numero;
    record['cvc'] = this.cvc;
    record['fechaExp'] = this.fechaExp;

    console.log(record);
    this.creditCardService.create_NewItem(record).then(async resp => {
      this.nombre = '';
      this.numero = '';
      this.cvc = '';
      this.fechaExp = '';
     
      await this.modalCtrl.dismiss();
      const modal = await this.modalCtrl.create({
        component: AgregarPage,
        cssClass: 'sizeModalAgregarProducto'
      });
      await modal.present();
    })
      .catch(error => {
        console.log(error);
      });
      
  }

  async openAgregarListo() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: AgregarlistoPage,
      cssClass: 'sizeModalAgregarListo'
    });
    await modal.present();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
