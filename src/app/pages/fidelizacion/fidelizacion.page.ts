import { Component, OnInit } from '@angular/core';
import { ModalPlanesPage } from '../modals/modal-planes/modal-planes.page';

import { ModalController } from '@ionic/angular';
import { FidelizacionService } from 'src/app/services/fidelizacion.service';


@Component({
  selector: 'app-fidelizacion',
  templateUrl: './fidelizacion.page.html',
  styleUrls: ['./fidelizacion.page.scss'],
})
export class FidelizacionPage implements OnInit {
  public items: any = [];
  zipped: boolean = true;

  data:any;
  name: string;
  from: string;
  to: string;
  qtyValue: number;
  value: string;
  qtyBuy: number;
  buy: string;
  status:boolean;

  constructor(private modalCtrl: ModalController,private fidelizacionService:FidelizacionService) {
    this.items = [
      { expanded: false }
    ];
   }

   async createplan() {
    const modal = await this.modalCtrl.create({
      component: ModalPlanesPage,
      componentProps:{
        type: 'create',
      },
      cssClass: 'sizeModalPlanes',
      backdropDismiss:false,
    });
    await modal.present();
    
 }
//  Planes crea
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
    this.fidelizacionService.read_Items().then(data => {
       data.subscribe(e => {
        this.data = e;
      })
    });
  }


  RemoveRecord(rowID) {
    this.fidelizacionService.delete_Item(rowID);
  }
 
  async EditRecord(record, recordID) {
    console.log(record, recordID);
    record.isEdit = true;
    record['Name'] = record.name;
    record['from'] = record.from;
    record['to'] = record.to;
    record['qtyValue'] = record.qtyValue;
    record['value'] = record.value;
    record['qtyBuy'] = record.qtyBuy;
    record['buy'] = record.buy;
    record['status'] = record.status;
    record['id'] = recordID;
    const modal = await this.modalCtrl.create({
      component: ModalPlanesPage,
      componentProps:{
        type: 'edit',
        data: record,
      },
      cssClass: 'sizeModalPlanes'
    });
    await modal.present();
  }

}
