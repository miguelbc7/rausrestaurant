import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DineromodalPage } from '../modals/dineromodal/dineromodal.page';

import { IonicModule } from '@ionic/angular';

import { CierrePage } from './cierre.page';

const routes: Routes = [
  {
    path: '',
    component: CierrePage
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

    DineromodalPage
  ],
  entryComponents: [
    DineromodalPage
  ]
})
export class CierrePageModule {}
