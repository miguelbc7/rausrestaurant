import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionPage } from './configuracion.page';

import { SharedModule } from '../sharedmodals/shared.module';

// import { ExpandableComponent } from "../../components/expandable/expandable.component";


const routes: Routes = [
  {
    path: '',
    component: ConfiguracionPage
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
    ConfiguracionPage,
    // ExpandableComponent
  ],
  entryComponents: [
    // ExpandableComponent
  ]
})
export class ConfiguracionPageModule {}
