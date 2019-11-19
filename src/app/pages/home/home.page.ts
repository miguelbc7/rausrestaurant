import { Component, OnInit } from '@angular/core';
import { HorariosPage } from '../modals/horarios/horarios.page';

import { AddsliderPage } from '../modals/addslider/addslider.page';
import { EditavatarPage } from '../modals/editavatar/editavatar.page';
import { ModalAddproductPage } from '../modals/modal-addproduct/modal-addproduct.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { EditdireccionPage } from '../modals/editdireccion/editdireccion.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private modalCtrl: ModalController) {
   }

  ngOnInit() {
  }
  async addslider() {
   const modal = await this.modalCtrl.create({
     component: AddsliderPage,
   });
   await modal.present();
}

  async openHorarios() {
    const modal = await this.modalCtrl.create({
      component: HorariosPage,
    });
  
    await modal.present();
  }
  async addproduct() {
    console.log('click');
    const modal = await this.modalCtrl.create({
      component: ModalAddproductPage,
    });
  
    await modal.present();
  }

  async addpromocion() {
    console.log('click');
    const modal = await this.modalCtrl.create({
      component: ModalPromocionPage,
      cssClass: 'sizeModalPromocion'
    });
  
    await modal.present();
  }
  async editAvatar() {
    const modal = await this.modalCtrl.create({
      component: EditavatarPage,
      cssClass: 'sizeModalAvatar'
    });
  
    await modal.present();
  }

  async editdireccion() {
    const modal = await this.modalCtrl.create({
      component: EditdireccionPage,
      cssClass: 'sizeModalDireccion'
    });
  
    await modal.present();
  }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1
    // autoplay:true
   };
   

}


