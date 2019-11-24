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
    this.fidelizacionService.read_Items().subscribe(data => {
 
      this.data = data.map(e => {
        return {
          isEdit: false,
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          from: e.payload.doc.data()['from'],
          to: e.payload.doc.data()['to'],
          qtyValue: e.payload.doc.data()['qtyValue'],
          value: e.payload.doc.data()['value'],
          qtyBuy: e.payload.doc.data()['qtyBuy'],
          buy: e.payload.doc.data()['buy'],
          status: e.payload.doc.data()['status'],
        };
      })
      console.log(this.data);
 
    });
  }


  RemoveRecord(rowID) {
    this.fidelizacionService.delete_Item(rowID);
  }
 
  async EditRecord(record) {
    record.isEdit = true;
    record['Name'] = record.name;
    record['from'] = record.from;
    record['to'] = record.to;
    record['qtyValue'] = record.qtyValue;
    record['value'] = record.value;
    record['qtyBuy'] = record.qtyBuy;
    record['buy'] = record.buy;
    record['status'] = record.status;
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
