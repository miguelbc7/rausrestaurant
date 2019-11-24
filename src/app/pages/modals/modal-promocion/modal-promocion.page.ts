import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExcelentePage } from '../excelente/excelente.page';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PromocionService } from '../../../services/promocion.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal-promocion',
  templateUrl: './modal-promocion.page.html',
  styleUrls: ['./modal-promocion.page.scss'],
})
export class ModalPromocionPage implements OnInit {

  name:any = 1;

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,  private router: Router,
    private promocionService: PromocionService, private storage: Storage, 
    ) { }

  ngOnInit() {
   
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
  async addprom() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ExcelentePage,
      cssClass: 'sizeModalPromocion'
    });
    await modal.present();
    
 }

 radioVal(value){
  this.name = value;
  console.log(value);
 }

 createForm(){
  let item = {
    name: this.name,
  }
  this.promocionService.createItem(item).then(res =>{
    res.subscribe(data =>{
      console.log(data);
      console.log(data._id);
      this.promocionService.productPromo(data._id).then(resp =>{
        res.subscribe(dat =>{
          console.log(dat);
        });
      });
    },
    error=>{
      console.log(error);
    })
  });
}

}
