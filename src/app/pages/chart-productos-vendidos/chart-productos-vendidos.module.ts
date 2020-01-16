import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartProductosVendidosPageRoutingModule } from './chart-productos-vendidos-routing.module';

import { ChartProductosVendidosPage } from './chart-productos-vendidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartProductosVendidosPageRoutingModule
  ],
  declarations: [ChartProductosVendidosPage]
})
export class ChartProductosVendidosPageModule {}
