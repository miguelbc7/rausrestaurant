import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartTipoServicioPage } from './chart-tipo-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: ChartTipoServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartTipoServicioPageRoutingModule {}
