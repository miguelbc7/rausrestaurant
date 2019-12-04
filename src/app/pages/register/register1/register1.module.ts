import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { TagInputModule } from 'ngx-chips';

import { MapPage } from '../../modals/map/map.page';

import { IonicModule } from '@ionic/angular';

import { Register1Page } from './register1.page';

const routes: Routes = [
  {
    path: '',
    component: Register1Page
  }
];

@NgModule({
  imports: [
    TagInputModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    
  ],
  declarations: [
    Register1Page,
    
    ]
})
export class Register1PageModule {}
