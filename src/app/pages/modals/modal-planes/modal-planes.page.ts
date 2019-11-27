import { Component, OnInit, Input } from '@angular/core';
import { FidelizacionService } from 'src/app/services/fidelizacion.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
  public loyaltyForm: FormGroup;
  validation_messages = {
    'name': [
        { type: 'required', message: 'Debe ingresar un nombre del plan.' },
        { type: 'minlength', message: 'Debe ser mayor de 5 caracteres.' },
        { type: 'maxlength', message: 'Debe ser menor de 300 caracteres.' }
      ],
      'from': [
        { type: 'required', message: 'Debe ingresar una fecha inicial.' },
      ],
      'to': [
        { type: 'required', message: 'Debe ingresar una fecha final.' },
      ],
      'qtyValue': [
        { type: 'required', message: 'Debe ingresar una cantidad.' },
      ],
      'value': [
        { type: 'required', message: 'Debe ingresar un monto.' },
      ],
      
      'qtyBuy': [
        { type: 'required', message: 'Debe ingresar una cantidad.' },
      ],
      'buy': [
        { type: 'required', message: 'Debe ingresar una cantidad de compras.' },
      ],
      // 'categories': [
      //   { type: 'required', message: 'Debe ingresar por lo menos una actividad de tu empresa.' },
      // ],
    }

  constructor(private fidelizacionService:FidelizacionService, private navParams: NavParams, private modalController: ModalController, public formBuilder: FormBuilder) { 
    this.loyaltyForm = this.formBuilder.group({
        name: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.minLength(5)
        ])],
        from: ['', Validators.compose([
          Validators.required,
        ])],
        to: ['', Validators.compose([
          Validators.required,
        ])],
        qtyValue: ['', Validators.compose([
          Validators.required,
        ])],
        value: ['', Validators.compose([
          Validators.required,
        ])],
        buy: ['', Validators.compose([
          Validators.required,
        ])],
        qtyBuy: ['', Validators.compose([
          Validators.required,
        ])],
        status: [false],
    });
  }

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
     await this.modalController.dismiss();
    })
      .catch(error => {
        console.log(error);
      });
  }

   
 async UpdateRecord(recordID) {
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
    console.log(record);
    console.log(recordID);
    this.fidelizacionService.update_Item(recordID, record);
    // recordRow.isEdit = false;
    await this.modalController.dismiss();
  }
}
