import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ModalEditavatarPage } from '../modals/modal-editavatar/modal-editavatar.page';
import { ColorPickerModule } from 'ngx-color-picker';

import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';

import { SharedModule } from '../sharedmodals/shared.module';


const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
    ColorPickerModule
  ],
  exports: [
    ColorPickerModule
  ],
  declarations: [
    PerfilPage,
    ModalEditavatarPage
  ],
  entryComponents: [
    ModalEditavatarPage
  ]

})
export class PerfilPageModule {}
