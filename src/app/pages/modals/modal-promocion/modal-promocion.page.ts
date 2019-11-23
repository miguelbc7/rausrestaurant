import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExcelentePage } from '../excelente/excelente.page';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-modal-promocion',
  templateUrl: './modal-promocion.page.html',
  styleUrls: ['./modal-promocion.page.scss'],
})
export class ModalPromocionPage implements OnInit {

  public promotionForm : FormGroup;

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder, 
    ) { }

  ngOnInit() {
    this.promotionForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ]) ),
  });
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
}
