import { Routes } from '@angular/router';

import { UsuarioComponent } from './usuario/usuario.component';
import { AdminComponent } from './admin/admin.component';
import { UsuarioFormComponent } from './usuario/usuarioForm.component';
import { ProveedorComponent } from './proveedor/proveedor.component';


export const dashboard_routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'admin/user', component: UsuarioComponent },
  { path: 'admin/user/:id', component: UsuarioFormComponent },
  { path: 'admin/provider/:id', component: ProveedorComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'admin' }
];

