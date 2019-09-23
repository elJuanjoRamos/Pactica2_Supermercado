import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';



import { dashboard_routes } from './components/admin/dashboard/dashboard.routes';

const routes: Routes = [

  { path: 'login/:id', component: LoginComponent },
  { path: 'registro/nuevoUsuario', component: RegistroComponent },

//ESTO ES AMDINISTRADOR
  { path: 'dashboard', component: DashboardComponent, children: dashboard_routes/*, canActivate: [ AuthGuardService ]*/ },

  {path: '**', pathMatch: 'full', redirectTo: 'login/access'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
