import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartProductosVendidosPage } from './chart-productos-vendidos.page';

const routes: Routes = [
  {
    path: '',
    component: ChartProductosVendidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartProductosVendidosPageRoutingModule {}
