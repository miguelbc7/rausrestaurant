import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartOperacionesPage } from './chart-operaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ChartOperacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartOperacionesPageRoutingModule {}
