import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsnotificationsPageRoutingModule } from './detailsnotifications-routing.module';

import { DetailsnotificationsPage } from './detailsnotifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsnotificationsPageRoutingModule
  ],
  declarations: [DetailsnotificationsPage]
})
export class DetailsnotificationsPageModule {}
