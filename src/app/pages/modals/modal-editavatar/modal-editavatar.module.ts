import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalEditavatarPage } from './modal-editavatar.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditavatarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalEditavatarPage]
})
export class ModalEditavatarPageModule {}
