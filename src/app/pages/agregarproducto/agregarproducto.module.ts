import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AgregarproductoPage } from './agregarproducto.page';

import { SharedModule } from '../sharedmodals/shared.module';

// import { ProductocreadoPage } from '../modals/productocreado/productocreado.page';
import { BrMaskerModule } from 'br-mask';

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
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    BrMaskerModule,
  ],
  declarations: [
    AgregarproductoPage,
    // ProductocreadoPage
  ],
  entryComponents: [
    AgregarproductoPage,
    // ProductocreadoPage
  ]
})
export class AgregarproductoPageModule {}
