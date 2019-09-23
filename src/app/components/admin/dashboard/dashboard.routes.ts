import { Routes } from '@angular/router';

import { UsuarioComponent } from './usuario/usuario.component';
import { AdminComponent } from './admin/admin.component';
import { UsuarioFormComponent } from './usuario/usuarioForm.component';


export const dashboard_routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'admin/user', component: UsuarioComponent },
  { path: 'admin/user/:id', component: UsuarioFormComponent },
  /*{ path: 'usuario/:editar', component: UsuarioFormComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'categoria/:idCategoria', component: CategoriaFormComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'contacto/:idContacto', component: ContactoFormComponent },
  { path: 'tarea', component: TareaComponent },
  { path: 'tarea/:idTarea', component: TareaFormComponent },*/
  { path: '**', pathMatch: 'full', redirectTo: 'admin' }
];

