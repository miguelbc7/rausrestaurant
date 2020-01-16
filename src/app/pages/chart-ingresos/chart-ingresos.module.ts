import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartIngresosPageRoutingModule } from './chart-ingresos-routing.module';

import { ChartIngresosPage } from './chart-ingresos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartIngresosPageRoutingModule
  ],
  declarations: [ChartIngresosPage]
})
export class ChartIngresosPageModule {}
