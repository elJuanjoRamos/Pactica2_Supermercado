import { Routes } from '@angular/router';

import { UsuarioComponent } from './usuario/usuario.component';
import { AdminComponent } from './admin/admin.component';
import { UsuarioFormComponent } from './usuario/usuarioForm.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductoFormComponent } from './producto/productoForm.component';


export const dashboard_routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'admin/user', component: UsuarioComponent },
  { path: 'admin/user/:id', component: UsuarioFormComponent },
  { path: 'admin/provider/:id', component: ProveedorComponent },
  { path: 'admin/producto', component: ProductoComponent },
  { path: 'admin/producto/:id', component: ProductoFormComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'admin' }
];

