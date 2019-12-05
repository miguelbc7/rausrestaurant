import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { AddsliderPage } from './addslider.page';

const routes: Routes = [
  {
    path: '',
    component: AddsliderPage
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
    // BuscarfotoPage
  ],
  entryComponents: [
    // BuscarfotoPage
  ]
})
export class AddsliderPageModule {}
