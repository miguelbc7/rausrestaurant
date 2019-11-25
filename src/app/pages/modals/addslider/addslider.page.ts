import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BuscarfotoPage} from '../buscarfoto/buscarfoto.page';

@Component({
  selector: 'app-addslider',
  templateUrl: './addslider.page.html',
  styleUrls: ['./addslider.page.scss'],
})
export class AddsliderPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  // async buscarfoto() {
  //   const modal = await this.modalCtrl.create({
  //     component: BuscarfotoPage,
  //   });
  //   await modal.present();
  // }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

 

}
