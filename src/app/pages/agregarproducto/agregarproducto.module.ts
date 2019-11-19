import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AddsliderPage } from '../modals/addslider/addslider.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { AgregarproductoPage } from './agregarproducto.page';
import { ExcelentePage } from '../modals/excelente/excelente.page';


const routes: Routes = [
  {
    path: '',
    component: AgregarproductoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgregarproductoPage, ModalPromocionPage,AddsliderPage,ExcelentePage],
  entryComponents: [
    ModalPromocionPage,AddsliderPage,ExcelentePage
  ]
})
export class AgregarproductoPageModule {}
