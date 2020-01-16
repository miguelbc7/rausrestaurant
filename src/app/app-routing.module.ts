import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'welcome1', pathMatch: 'full' },
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
  { path: 'agregarproducto', loadChildren: './pages/agregarproducto/agregarproducto.module#AgregarproductoPageModule' },
  { path: 'productocreado', loadChildren: './pages/modals/productocreado/productocreado.module#ProductocreadoPageModule' },
  { path: 'productoguardado', loadChildren: './pages/modals/productoguardado/productoguardado.module#ProductoguardadoPageModule' },
  { path: 'welcome1', loadChildren: './pages/welcome1/welcome1.module#Welcome1PageModule' },
  { path: 'map', loadChildren: './pages/modals/map/map.module#MapPageModule' },
  {
    path: 'showcase',
    loadChildren: () => import('./pages/showcase/showcase.module').then( m => m.ShowcasePageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./pages/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/modals/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'programation',
    loadChildren: () => import('./pages/programation/programation.module').then( m => m.ProgramationPageModule)
  },
  {
    path: 'add-date',
    loadChildren: () => import('./pages/modals/add-date/add-date.module').then( m => m.AddDatePageModule)
  },
  {
    path: 'chart-client',
    loadChildren: () => import('./pages/chart-client/chart-client.module').then( m => m.ChartClientPageModule)
  },
  {
    path: 'chart-ingresos',
    loadChildren: () => import('./pages/chart-ingresos/chart-ingresos.module').then( m => m.ChartIngresosPageModule)
  },
  {
    path: 'chart-venta',
    loadChildren: () => import('./pages/chart-venta/chart-venta.module').then( m => m.ChartVentaPageModule)
  },
  {
    path: 'success-modal',
    loadChildren: () => import('./pages/modals/success-modal/success-modal.module').then( m => m.SuccessModalPageModule)
  },
  {
    path: 'chart-puntos',
    loadChildren: () => import('./pages/chart-puntos/chart-puntos.module').then( m => m.ChartPuntosPageModule)
  },
  {
    path: 'chart-operaciones',
    loadChildren: () => import('./pages/chart-operaciones/chart-operaciones.module').then( m => m.ChartOperacionesPageModule)
  },
  {
    path: 'chart-productos-vendidos',
    loadChildren: () => import('./pages/chart-productos-vendidos/chart-productos-vendidos.module').then( m => m.ChartProductosVendidosPageModule)
  },
  {
    path: 'chart-tipo-servicio',
    loadChildren: () => import('./pages/chart-tipo-servicio/chart-tipo-servicio.module').then( m => m.ChartTipoServicioPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },











];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
