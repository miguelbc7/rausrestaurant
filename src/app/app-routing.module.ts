import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  { path: 'register1', loadChildren: './pages/register/register1/register1.module#Register1PageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'opciones', loadChildren: './pages/opciones/opciones.module#OpcionesPageModule' },
  { path: 'agregarproducto', loadChildren: './pages/agregarproducto/agregarproducto.module#AgregarproductoPageModule' },
  { path: 'modal-promocion', loadChildren: './pages/modals/modal-promocion/modal-promocion.module#ModalPromocionPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
