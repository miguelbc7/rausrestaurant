import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExcelentePage } from '../excelente/excelente.page';


@Component({
  selector: 'app-modal-promocion',
  templateUrl: './modal-promocion.page.html',
  styleUrls: ['./modal-promocion.page.scss'],
})
export class ModalPromocionPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
  async addprom() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ExcelentePage,
      cssClass: 'sizeModalPromocion'
    });
    await modal.present();
    
 }
}
