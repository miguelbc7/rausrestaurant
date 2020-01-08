import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FidelizacionPage } from './fidelizacion.page';
import { ModalPlanesPage } from '../modals/modal-planes/modal-planes.page';


import { SharedModule } from '../sharedmodals/shared.module';


const routes: Routes = [
  {
    path: '',
    component: FidelizacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    FidelizacionPage,
    ModalPlanesPage
  ],
  entryComponents: [
    ModalPlanesPage
  ]
})
export class FidelizacionPageModule {}
