import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  { path: 'register1', loadChildren: './pages/register/register1/register1.module#Register1PageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'opciones', loadChildren: './pages/opciones/opciones.module#OpcionesPageModule' },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'historial', loadChildren: './pages/historial/historial.module#HistorialPageModule' },
  { path: 'agregar', loadChildren: './pages/modals/agregar/agregar.module#AgregarPageModule' },
  { path: 'agregartarjeta', loadChildren: './pages/modals/agregartarjeta/agregartarjeta.module#AgregartarjetaPageModule' },
  { path: 'agregarconfirmar', loadChildren: './pages/modals/agregarconfirmar/agregarconfirmar.module#AgregarconfirmarPageModule' },
  { path: 'agregarlisto', loadChildren: './pages/modals/agregarlisto/agregarlisto.module#AgregarlistoPageModule' },
  { path: 'configuracion', loadChildren: './pages/configuracion/configuracion.module#ConfiguracionPageModule' },
  { path: 'analiticas', loadChildren: './pages/analiticas/analiticas.module#AnaliticasPageModule' },
  { path: 'cierre', loadChildren: './pages/cierre/cierre.module#CierrePageModule' },
  { path: 'dineromodal', loadChildren: './pages/modals/dineromodal/dineromodal.module#DineromodalPageModule' },
  { path: 'fidelizacion', loadChildren: './pages/fidelizacion/fidelizacion.module#FidelizacionPageModule' },
  { path: 'modal-planes', loadChildren: './pages/modals/modal-planes/modal-planes.module#ModalPlanesPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
