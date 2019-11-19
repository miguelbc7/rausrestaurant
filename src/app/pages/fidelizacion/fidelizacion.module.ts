import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FidelizacionPage } from './fidelizacion.page';
import { ModalPlanesPage } from '../modals/modal-planes/modal-planes.page';


import { ExpandableComponent } from "../../components/expandable/expandable.component";


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
    RouterModule.forChild(routes)
  ],
  declarations: [FidelizacionPage,ExpandableComponent,ModalPlanesPage],
  entryComponents: [
    ExpandableComponent,ModalPlanesPage
  ]
})
export class FidelizacionPageModule {}
