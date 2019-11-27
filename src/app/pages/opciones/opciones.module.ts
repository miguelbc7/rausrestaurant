import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../sharedmodals/shared.module';

import { IonicModule } from '@ionic/angular';

import { OpcionesPage } from './opciones.page';
import { AgregarPage } from '../modals/agregar/agregar.page';
import { AgregartarjetaPage } from '../modals/agregartarjeta/agregartarjeta.page';
import { AgregarlistoPage } from '../modals/agregarlisto/agregarlisto.page';

import { AgregarconfirmarPage } from '../modals/agregarconfirmar/agregarconfirmar.page';
import { DineromodalPage } from '../modals/dineromodal/dineromodal.page';

import { CierrePage } from '../cierre/cierre.page';

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
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    OpcionesPage,
    AgregarPage,
    AgregartarjetaPage,
    AgregarlistoPage,
    AgregarconfirmarPage,
    CierrePage,
    DineromodalPage
  ],
  entryComponents: [
    AgregarPage,
    AgregartarjetaPage,
    AgregarlistoPage,
    AgregarconfirmarPage,
    CierrePage,
    DineromodalPage
  ]
})
export class OpcionesPageModule {}
