import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DineromodalPage } from '../modals/dineromodal/dineromodal.page';

@Component({
  selector: 'app-cierre',
  templateUrl: './cierre.page.html',
  styleUrls: ['./cierre.page.scss'],
})
export class CierrePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openDineroModal() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: DineromodalPage,
      cssClass: 'sizeModalDineroModal'
    });
    await modal.present();
 }

 async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
