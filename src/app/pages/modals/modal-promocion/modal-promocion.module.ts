import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ModalPromocionPage,
  ],
  entryComponents: [
  ]
})
export class ModalPromocionPageModule {}
