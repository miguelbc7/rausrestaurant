import { Component, OnInit, Input } from '@angular/core';
import { FidelizacionService } from 'src/app/services/fidelizacion.service';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-planes',
  templateUrl: './modal-planes.page.html',
  styleUrls: ['./modal-planes.page.scss'],
})
export class ModalPlanesPage implements OnInit {

  data:any;
  name: string ='';
  from: string;
  to: string;
  qtyValue: number;
  value: string;
  qtyBuy: number;
  buy: string;
  status:boolean = false;
  public type = this.navParams.get('type');
  public item = this.navParams.get('data');

  constructor(private fidelizacionService:FidelizacionService, private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    if(this.type == 'edit'){
      this.name = this.item.name;
      this.from = this.item.from;
      this.to = this.item.to;
      this.qtyValue =this.item.qtyValue;
      this.value = this.item.value;
      this.qtyBuy = this.item.qtyBuy;
      this.buy = this.item.buy;
      this.status = this.item.status;
    }
    
  }

 async CreateRecord() {
    let record = {};
    record['name'] = this.name;
    record['from'] = this.from;
    record['to'] = this.to;
    record['qtyValue'] = this.qtyValue;
    record['value'] = this.value;
    record['qtyBuy'] = this.qtyBuy;
    record['buy'] = this.buy;
    record['status'] = this.status;

    console.log(record);
    this.fidelizacionService.create_NewItem(record).then(async resp => {
      this.name = '';
      this.from = '';
      this.to = '';
      this.qtyValue = 0;
      this.value = '';
      this.qtyBuy = 0;
      this.buy = '';
      this.status = false;
      console.log(resp);
     await this.modalController.dismiss();
    })
      .catch(error => {
        console.log(error);
      });
  }

   
 async UpdateRecord(recordRow) {
   console.log(this.item.name);
    let record = {};
    record['name'] = this.name;
    record['from'] = this.from;
    record['to'] = this.to;
    record['qtyValue'] = this.qtyValue;
    record['value'] = this.value;
    record['qtyBuy'] = this.qtyBuy;
    record['buy'] = this.buy;
    record['status'] = this.status;
    this.fidelizacionService.update_Item(recordRow.id, record);
    recordRow.isEdit = false;
    await this.modalController.dismiss();
  }
}
