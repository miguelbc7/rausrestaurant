import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShowcasePageRoutingModule } from './showcase-routing.module';
import { ShowcasePage } from './showcase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ShowcasePageRoutingModule
  ],
  declarations: [ShowcasePage]
})
export class ShowcasePageModule {}
