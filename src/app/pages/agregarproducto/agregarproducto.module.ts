import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { AgregarproductoPage } from './agregarproducto.page';

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
  declarations: [AgregarproductoPage, ModalPromocionPage],
  entryComponents: [
    ModalPromocionPage
  ]
})
export class AgregarproductoPageModule {}
