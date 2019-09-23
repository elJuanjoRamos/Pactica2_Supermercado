import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../../../../api/models/usuario';


@Component({
    selector: 'app-adm-usuarioform',
    templateUrl: './usuarioForm.component.html',
    styles: []
  })
  export class UsuarioFormComponent implements OnInit{
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    usuario: any;
    validar: boolean=false;
    nombreUsuario: string;
    texto: string;
    uri: string = "";
    constructor(private service: UsuarioService, 
      private formBuilder: FormBuilder, 
      private router: Router,
      private activaderRoutes: ActivatedRoute) {

    }
    ngOnInit() {
      this.activaderRoutes.params.subscribe(params => {
        this.uri = params["id"];
        if (this.uri === "nuevo") {
            this.loginForm = this.formBuilder.group({
              username: ['', Validators.required],
              password: ['', Validators.required],
              nombre: ['', Validators.required],
              apellido: ['', Validators.required],
              Rol_idRol: ['', Validators.required]
            });
            this.nombreUsuario = "Nuevo Usuario";
            this.texto = "El formulario de la derecha sirve para ingresar nuevos usuarios a la base de datos, todos los campos son requeridos";
        } else {
          this.service.getU(params["id"])
          .subscribe(usuario => {
            this.usuario = usuario;
            this.nombreUsuario = this.usuario.nombre;
            this.texto = "El formulario de la derecha sirve para editar el usuario seleccionado, todos los campos son requeridos";
            this.validar = true;
            this.loginForm = new FormGroup({
              'nombre': new FormControl(this.usuario.nombre, Validators.required),
              'apellido': new FormControl(this.usuario.apellido, Validators.required),
              'username': new FormControl(this.usuario.username, Validators.required),
              'password': new FormControl(this.usuario.pass, Validators.required),
              'Rol_idRol': new FormControl(this.usuario.Rol_idRol,  Validators.required),
            });
          });
        }
      });
    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      if (this.uri === 'nuevo') {
        this.loading = true;
        console.log(this.loginForm.value)
        this.service.post(this.loginForm.value)
        .subscribe(res => {
            if(res){
              this.router.navigate(['/dashboard/admin/user']);
            }
        });
      } else {
        console.log(this.loginForm.value);
        this.service.put(this.loginForm.value, this.uri)
        .subscribe(res => {
          if(res) {
            //setTimeout(() => {
              this.router.navigate(['/dashboard/admin/user']);
            //}, 2000);
          }
        });
      }

  }
}