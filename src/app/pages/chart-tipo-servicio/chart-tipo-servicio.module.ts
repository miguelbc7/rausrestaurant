import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartTipoServicioPageRoutingModule } from './chart-tipo-servicio-routing.module';

import { ChartTipoServicioPage } from './chart-tipo-servicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartTipoServicioPageRoutingModule
  ],
  declarations: [ChartTipoServicioPage]
})
export class ChartTipoServicioPageModule {}
