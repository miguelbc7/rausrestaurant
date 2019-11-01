import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ModalPoliticasPage } from '../../modals/modal-politicas/modal-politicas.page';
import { ModalTerminosPage } from '../../modals/modal-terminos/modal-terminos.page';
import { ModalCodigoPage } from '../../modals/modal-codigo/modal-codigo.page';

import { SharedModule } from '../../sharedmodals/shared.module';

import { IonicModule } from '@ionic/angular';

import { Register3Page } from './register3.page';

const routes: Routes = [
  {
    path: '',
    component: Register3Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    Register3Page,
    ModalPoliticasPage,
    ModalTerminosPage,
    ModalCodigoPage

  ],
  entryComponents: [
    ModalPoliticasPage,
    ModalTerminosPage,
    ModalCodigoPage
  ]
})
export class Register3PageModule {}
