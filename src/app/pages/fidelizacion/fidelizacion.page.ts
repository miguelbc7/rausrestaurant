import { Component, OnInit } from '@angular/core';
import { ModalPlanesPage } from '../modals/modal-planes/modal-planes.page';

import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-fidelizacion',
  templateUrl: './fidelizacion.page.html',
  styleUrls: ['./fidelizacion.page.scss'],
})
export class FidelizacionPage implements OnInit {
  public items: any = [];
  zipped: boolean = true;
  constructor(private modalCtrl: ModalController) {
    this.items = [
      { expanded: false }
    ];
   }

   async createplan() {
    const modal = await this.modalCtrl.create({
      component: ModalPlanesPage,
      cssClass: 'sizeModalPlanes'
    });
    await modal.present();
    
 }
//  Planes creados
expandItem(item): void {
  if (item.expanded) {
    item.expanded = false;
  } else {
    this.items.map(listItem => {
      if (item == listItem) {
        listItem.expanded = !listItem.expanded2;
      } else {
        listItem.expanded = false;
      }
      return listItem;
    });
  }
}
toggleZipped(): void {
  this.zipped = !this.zipped;
}
  ngOnInit() {
  }

}
