import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProgramationPageRoutingModule } from './programation-routing.module';

@NgModule({
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    ProgramationPageRoutingModule
  ],
  declarations: []
})
export class ProgramationPageModule {}
