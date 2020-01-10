import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsnotificationsPage } from './detailsnotifications.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsnotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsnotificationsPageRoutingModule {}
