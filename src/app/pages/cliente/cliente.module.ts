import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientePageRoutingModule } from './cliente-routing.module';

import { ClientePage } from './cliente.page';
import { SearchPage } from '../modals/search/search.page';


import { SharedModule } from '../sharedmodals/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    ClientePageRoutingModule
  ],
  declarations: [ClientePage,SearchPage,
],
entryComponents: [
    SearchPage
  ]
})
export class ClientePageModule {}
