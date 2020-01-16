import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartVentaPageRoutingModule } from './chart-venta-routing.module';

import { ChartVentaPage } from './chart-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartVentaPageRoutingModule
  ],
  declarations: [ChartVentaPage]
})
export class ChartVentaPageModule {}
