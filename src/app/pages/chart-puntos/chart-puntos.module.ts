import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartPuntosPageRoutingModule } from './chart-puntos-routing.module';

import { ChartPuntosPage } from './chart-puntos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartPuntosPageRoutingModule
  ],
  declarations: [ChartPuntosPage]
})
export class ChartPuntosPageModule {}
