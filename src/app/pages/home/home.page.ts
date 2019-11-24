import { Component, OnInit } from '@angular/core';
import { HorariosPage } from '../modals/horarios/horarios.page';

import { AddsliderPage } from '../modals/addslider/addslider.page';
import { EditavatarPage } from '../modals/editavatar/editavatar.page';
import { ModalAddproductPage } from '../modals/modal-addproduct/modal-addproduct.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { EditdireccionPage } from '../modals/editdireccion/editdireccion.page';
// import { AgregarPage } from '../modals/agregar/agregar.page';
// import { CierrePage } from '../cierre/cierre.page';
// import { AgregartarjetaPage } from '../modals/agregartarjeta/agregartarjeta.page';
import { ModalController } from '@ionic/angular';
import { ProductosService } from '../../services/productos.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  productos:any;
  token:any;

  constructor(private modalCtrl: ModalController, public productosService: ProductosService, private storage: Storage) {
    this.productos = [];
    this.storage.get('_token').then(val =>{
      this.token = val.token;
    })
   }

  ngOnInit() {
    this.getListProductos();
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

  // async openAgregarSaldo() {
  //   const modal = await this.modalCtrl.create({
  //     component: AgregarPage,
  //     cssClass: 'sizeModalAgregarProducto'
  //   });
  //   await modal.present();
  // }

  async addproduct() {
    console.log('click');
    const modal = await this.modalCtrl.create({
      component: ModalAddproductPage,
    });
  
    await modal.present();
  }

  async addpromocion(productID) {
    this.storage.set('productID', productID);
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

//  async openCierreModal() {
//   const modal = await this.modalCtrl.create({
//     component: CierrePage,
//     cssClass: 'sizeModalCierreModal'
//   });
//   await modal.present();
// }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1
    // autoplay:true
   };
   
   getListProductos()
   {
    this.productosService.getList().then(response => {
      response.subscribe((data) => {
        this.productos = data.products;
        console.log(data);
     }, err => {
      console.log(err);
    });
    })
   }

}


