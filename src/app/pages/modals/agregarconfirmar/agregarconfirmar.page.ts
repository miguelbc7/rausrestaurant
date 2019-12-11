import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AgregarlistoPage } from '../agregarlisto/agregarlisto.page';
import { AgregarPage } from '../agregar/agregar.page';
import { SaldoService } from 'src/app/services/saldo.service';

@Component({
  selector: 'app-agregarconfirmar',
  templateUrl: './agregarconfirmar.page.html',
  styleUrls: ['./agregarconfirmar.page.scss'],
})
export class AgregarconfirmarPage implements OnInit {

  public value = this.navParams.get('value');
  public cardID = this.navParams.get('cardID');

  constructor(private modalCtrl: ModalController, private saldoService:SaldoService, private navParams: NavParams,) { }

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

    let record = {};
    let float = this.value.split('.').join('');
    let number = float.split(',').join('.');
    console.log(number);
    record['value'] = number;
    record['cardID'] = this.cardID;
    console.log(record);
    // return false;
    this.saldoService.create_NewItem(record).then(async resp => {
     
      await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: AgregarlistoPage,
      cssClass: 'sizeModalAgregarListo'
    });
    await modal.present();
  })
    .catch(error => {
        console.log(error);
      });
    
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
