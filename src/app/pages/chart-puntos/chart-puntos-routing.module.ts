import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartPuntosPage } from './chart-puntos.page';

const routes: Routes = [
  {
    path: '',
    component: ChartPuntosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartPuntosPageRoutingModule {}
