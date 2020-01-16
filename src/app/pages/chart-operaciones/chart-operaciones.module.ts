import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartOperacionesPageRoutingModule } from './chart-operaciones-routing.module';

import { ChartOperacionesPage } from './chart-operaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartOperacionesPageRoutingModule
  ],
  declarations: [ChartOperacionesPage]
})
export class ChartOperacionesPageModule {}
