import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowcasePage } from './showcase.page';

const routes: Routes = [
  {
    path: '',
    component: ShowcasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowcasePageRoutingModule {}
