import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalPromocionPage } from './modal-promocion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPromocionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    // ModalPromocionPage,
  ],
  entryComponents: [
  ]
})
export class ModalPromocionPageModule {}
