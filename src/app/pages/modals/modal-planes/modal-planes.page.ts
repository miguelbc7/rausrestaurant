import { Component, OnInit, Input } from '@angular/core';
import { FidelizacionService } from 'src/app/services/fidelizacion.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as moment from "moment"; 

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
  value: number;
  qtyBuy: number;
  buy: number;
  date = new Date();
  today = new Date().toISOString();
  tomorrow = new Date(Date.now() + 1*24*60*60*1000).toISOString();
  status:boolean = false;
  public type = this.navParams.get('type');
  public item = this.navParams.get('data');
  public loyaltyForm: FormGroup;
  error = '';
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
          // Validators.required,
        ])],
        qtyBuy: ['', Validators.compose([
          // Validators.required,
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
    if(this.qtyValue)
      record['qtyValue'] = this.qtyValue;
    if(this.value)
      record['value'] = this.value;
    if(this.qtyBuy)
      record['qtyBuy'] = this.qtyBuy;
    if(this.buy)
      record['buy'] = this.buy;
    record['status'] = this.status;

    if(this.from > this.to)
    {
      this.error = 'La fecha inicial debe ser menor a la fecha final';
      return false;
    }

    console.log(record);
    this.fidelizacionService.create_NewItem(record).then(async resp => {
      this.name = '';
      this.from = '';
      this.to = '';
      this.qtyValue = null;
      this.value = null;
      this.qtyBuy = null;
      this.buy = null;
      this.status = false;
     await this.modalController.dismiss();
    })
      .catch(error => {
        console.log(error);
      });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

   
 async UpdateRecord(recordID) {
   console.log(this.item.name);
    let record = {};
    record['name'] = this.name;
    record['from'] = this.from;
    record['to'] = this.to;
    if(this.qtyValue)
      record['qtyValue'] = this.qtyValue;
    if(this.value)
      record['value'] = this.value;
    if(this.qtyBuy)
      record['qtyBuy'] = this.qtyBuy;
    if(this.buy)
      record['buy'] = this.buy;
    record['status'] = this.status;
    console.log(record);
    console.log(recordID);
    
    if(this.from > this.to)
    {
      this.error = 'La fecha inicial debe ser menor a la fecha final';
      return false;
    }
    this.fidelizacionService.update_Item(recordID, record);
    // recordRow.isEdit = false;
    await this.modalController.dismiss();
  }

  add(){
    if(!this.qtyBuy)
      this.qtyBuy = 0;
    if(this.qtyBuy>= 0)
      this.qtyBuy= this.qtyBuy+1;
  }

  remove(){
    if(!this.qtyBuy)
      this.qtyBuy = 0;
    if(this.qtyBuy > 0)
      this.qtyBuy=this.qtyBuy- 1;
  }

  add2(){
    if(!this.qtyValue)
      this.qtyValue = 0;
    if(this.qtyValue >= 0)
    this.qtyValue= this.qtyValue+ 1;
  }

  remove2(){
    if(!this.qtyValue)
      this.qtyValue = 0;
    if(this.qtyValue > 0)
    this.qtyValue = this.qtyValue - 1;
  }

  validValue(type)
  {
    console.log(type);
    if(type == 'value'){
      console.log('s');
      console.log(this.loyaltyForm.valid);
      this.loyaltyForm.controls["buy"].clearValidators();
      this.loyaltyForm.controls["qtyBuy"].clearValidators();
      this.loyaltyForm.controls["buy"].updateValueAndValidity({onlySelf:false, emitEvent:true});
      this.loyaltyForm.controls["qtyBuy"].updateValueAndValidity({onlySelf:false, emitEvent:true});

      if( (!this.value  || this.value == 0 ) && (!this.qtyValue   || this.qtyValue == 0 ) )
      {
        console.log('d')
        console.log(this.loyaltyForm.valid);
        this.loyaltyForm.controls["value"].clearValidators();
        this.loyaltyForm.controls["qtyValue"].clearValidators();
        this.loyaltyForm.controls["buy"].updateValueAndValidity({onlySelf:false, emitEvent:true});
        this.loyaltyForm.controls["qtyBuy"].updateValueAndValidity({onlySelf:false, emitEvent:true});
      }
    }

    if(type == 'buy'){
      console.log('ss');
      console.log(this.loyaltyForm.valid);
      this.loyaltyForm.controls["buy"].setValidators([Validators.required]);
      this.loyaltyForm.controls["qtyBuy"].setValidators([Validators.required]);
      this.loyaltyForm.controls["value"].clearValidators();
      this.loyaltyForm.controls["qtyValue"].clearValidators();
      this.loyaltyForm.controls["buy"].updateValueAndValidity({onlySelf:false, emitEvent:true});
      this.loyaltyForm.controls["qtyBuy"].updateValueAndValidity({onlySelf:false, emitEvent:true});
      this.loyaltyForm.controls["value"].updateValueAndValidity({onlySelf:false, emitEvent:true});
      this.loyaltyForm.controls["qtyValue"].updateValueAndValidity({onlySelf:false, emitEvent:true});

      if( (!this.buy  || this.buy == 0 ) && (!this.qtyBuy   || this.qtyBuy == 0 ) )
      {
        console.log('dd')
        console.log(this.loyaltyForm.valid);
        this.loyaltyForm.controls["buy"].clearValidators();
        this.loyaltyForm.controls["qtyBuy"].clearValidators();
        this.loyaltyForm.controls["buy"].updateValueAndValidity({onlySelf:false, emitEvent:true});
        this.loyaltyForm.controls["qtyBuy"].updateValueAndValidity({onlySelf:false, emitEvent:true});
      }
    }
  }
}
