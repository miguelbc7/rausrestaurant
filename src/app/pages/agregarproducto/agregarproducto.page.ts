import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddsliderPage } from '../modals/addslider/addslider.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { ExcelentePage } from '../modals/excelente/excelente.page';


@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1
    // autoplay:true
   };

   async presentPromocion() {
    const modal = await this.modalCtrl.create({
      component: ModalPromocionPage,
      cssClass: 'sizeModalPromocion'
    });

    await modal.present();
  }
  async addprom() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ExcelentePage,
      cssClass: 'sizeModalPromocion'
    });
    await modal.present();
  }
  async addslider() {
    const modal = await this.modalCtrl.create({
      component: AddsliderPage,
    });
    await modal.present();
 }
}
