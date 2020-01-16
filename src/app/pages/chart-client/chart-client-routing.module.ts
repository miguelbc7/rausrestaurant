import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartClientPage } from './chart-client.page';

const routes: Routes = [
  {
    path: '',
    component: ChartClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartClientPageRoutingModule {}
