import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

import { HorariosPage } from '../modals/horarios/horarios.page';
import { AddsliderPage } from '../modals/addslider/addslider.page';
import { ModalAddproductPage } from '../modals/modal-addproduct/modal-addproduct.page';
import { ModalPromocionPage } from '../modals/modal-promocion/modal-promocion.page';
import { EditavatarPage } from '../modals/editavatar/editavatar.page';
import { EditdireccionPage } from '../modals/editdireccion/editdireccion.page';
import { ExcelentePage } from '../modals/excelente/excelente.page';


import { SharedModule } from '../sharedmodals/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
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
    HomePage,
    HorariosPage,
    AddsliderPage,
    EditavatarPage,
    ModalAddproductPage,
    ModalPromocionPage,
    EditdireccionPage,
    ExcelentePage
  ],
  entryComponents: [
    HorariosPage,
    AddsliderPage,
    EditavatarPage,
    ModalAddproductPage,
    ModalPromocionPage,
    EditdireccionPage,
    ExcelentePage
  ]
})
export class HomePageModule {}
