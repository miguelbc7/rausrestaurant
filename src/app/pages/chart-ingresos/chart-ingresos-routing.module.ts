import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartIngresosPage } from './chart-ingresos.page';

const routes: Routes = [
  {
    path: '',
    component: ChartIngresosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartIngresosPageRoutingModule {}
