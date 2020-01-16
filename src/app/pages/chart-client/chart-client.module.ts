import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartClientPageRoutingModule } from './chart-client-routing.module';

import { ChartClientPage } from './chart-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartClientPageRoutingModule
  ],
  declarations: [ChartClientPage]
})
export class ChartClientPageModule {}
