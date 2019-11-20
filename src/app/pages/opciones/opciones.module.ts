import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../sharedmodals/shared.module';

import { IonicModule } from '@ionic/angular';

import { OpcionesPage } from './opciones.page';
import { AgregarPage } from '../modals/agregar/agregar.page';
import { AgregartarjetaPage } from '../modals/agregartarjeta/agregartarjeta.page';
import { AgregarlistoPage } from '../modals/agregarlisto/agregarlisto.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OpcionesPage, 
    AgregarPage, 
    AgregartarjetaPage,
    AgregarlistoPage,
  ],
  entryComponents: [
    AgregarPage,
    AgregartarjetaPage,
    AgregarlistoPage,
  ]
})
export class OpcionesPageModule {}
