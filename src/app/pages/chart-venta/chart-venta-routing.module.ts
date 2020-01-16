import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartVentaPage } from './chart-venta.page';

const routes: Routes = [
  {
    path: '',
    component: ChartVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartVentaPageRoutingModule {}
