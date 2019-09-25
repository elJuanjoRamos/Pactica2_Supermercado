import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//modulos
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

//CLIENTE COMPONENTS
import { ClienteComponent } from './components/cliente/dashboard/cliente.component';


//modulos admin
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NavBarComponent } from './components/admin/navbar/navbar.component';
import { UsuarioComponent } from './components/admin/dashboard/usuario/usuario.component';
import { AdminComponent } from './components/admin/dashboard/admin/admin.component';
import { UsuarioFormComponent } from './components/admin/dashboard/usuario/usuarioForm.component';
import { ProveedorComponent } from './components/admin/dashboard/proveedor/proveedor.component';

//SERVICIOS
import { UsuarioService } from './services/usuario.service';
import { AuthenticationService } from './services/authentication.service';
import { ProveedorService } from './services/proveedor.service';

//AUXILIAR
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    //ESTO ES CLIENTE
    ClienteComponent,

    //ESTO ES ADMIN
    DashboardComponent,
    NavBarComponent,

    UsuarioComponent,
    AdminComponent,
    UsuarioFormComponent,
    ProveedorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UsuarioService,
    AuthenticationService,
    ProveedorService
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
