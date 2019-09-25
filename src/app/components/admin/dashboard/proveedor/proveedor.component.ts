import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { ProveedorService } from '../../../../services/proveedor.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
    selector: 'app-adm-proveedor',
    templateUrl: './proveedor.component.html',
    styles: []
  })
  export class ProveedorComponent implements OnInit{
    loginForm: FormGroup;
    loginForm2: FormGroup;
    loading = false;
    submitted = false;
    uri: any;
    estado: boolean = true;
    proveedor: any;
    proveedorOriginal: any;
    filter:any;
    p:any;
    constructor(private service: ProveedorService, private formBuilder: FormBuilder, 
                private activatedRoute: ActivatedRoute, private router: Router) {
        this.activatedRoute.params.subscribe(params => {
            this.uri = params["id"];
            if (this.uri === 'gestion') {
              this.estado = true;
            } else {
              this.estado = false;
              this.service.getU(this.uri).subscribe(c => {
                  this.proveedorOriginal = c;
                  this.loginForm = new FormGroup({
                    'nombre': new FormControl(this.proveedorOriginal.nombre),
                    'direccion': new FormControl(this.proveedorOriginal.direccion),
                    'telefono': new FormControl(this.proveedorOriginal.telefono)
                  });
                });
            }
          });
    }
    ngOnInit() {
      this.loginForm = this.formBuilder.group({
              nombre: ['', Validators.required],
              direccion: ['', Validators.required],
              telefono: ['', Validators.required]
      });
      this.loginForm2 = this.formBuilder.group({
        idProveedor1: ['', Validators.required],
        nombre1: ['', Validators.required],
        direccion1: ['', Validators.required],
        telefono1: ['', Validators.required]
      });
      this.inicializar();
    }
    get f() { return this.loginForm.controls; }

    public inicializar() {
      this.service.get().subscribe(u => {
        this.proveedor = u;
      });
    }
    borrar(id: any) {
      this.service.delete(id)
      .subscribe(res => {
        this.inicializar();
      });
    }

    onSubmit() {
      this.submitted = true;

        // stop here if form is invalid
      if (this.loginForm.invalid) { return; }
      this.loading = true;
      if (this.uri === 'gestion') {
          this.loading = true;
          this.service.post(this.loginForm.value)
          .subscribe(res => {
            this.inicializar();
            this.submitted = false;
            this.loading = false;
          });
        } else {
          this.service.put(this.loginForm.value, this.uri)
          .subscribe(res => {
            this.inicializar();
          });
        }
        this.loginForm.reset();
    }
    public cancelar() {
      this.loginForm.reset();
      this.router.navigate(['/dashboard/admin/provider/gestion']);
      this.estado = true;
      this.submitted = true;
    }
}

