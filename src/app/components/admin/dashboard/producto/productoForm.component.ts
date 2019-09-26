import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Producto } from '../../../../api/models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { ProveedorService } from '../../../../services/proveedor.service';
@Component({
    selector: 'app-adm-productoform',
    templateUrl: './productoForm.component.html',
    styles: []
})

export class ProductoFormComponent implements OnInit {
    loginForm: FormGroup;
    loading = true;
    submitted = false;
    returnUrl: string;
    error = '';
    producto: any;
    proveedor: any;
    prov: any;
    proveedores = [];
    validar: boolean = false;
    nombreProducto: string;
    texto: string;
    uri: string = "";
    tipo: string = '';

    constructor(private service: ProductoService,
                private provService: ProveedorService,
                private formBuilder: FormBuilder,
                private router: Router,
                private activaderRoutes: ActivatedRoute) {
                    this.provService.get().subscribe(data => this.proveedor = data);

    }
    ngOnInit() {
        if (localStorage) {
            this.activaderRoutes.params.subscribe(params => {
                this.uri = params["id"];
                if (this.uri === "nuevo") {
                    this.loginForm = this.formBuilder.group({
                        nombre: ['', Validators.required],
                        cantidad: ['', Validators.required],
                        precioVenta: ['', Validators.required],
                        descripcion: ['', Validators.required],
                        img: ['', Validators.required]
                    });
                    this.nombreProducto = "Nuevo";
                } else {
                    this.loading = false;
                    this.service.getU(params["id"])
                        .subscribe(p => {
                            this.producto = p;
                            this.nombreProducto = "#" + this.producto.idProducto;
                            this.loginForm = new FormGroup({
                                'nombre': new FormControl(this.producto.nombre, Validators.required),
                                'cantidad': new FormControl(this.producto.cantidad, Validators.required),
                                'precioVenta': new FormControl(this.producto.precioVenta, Validators.required),
                                'descripcion': new FormControl(this.producto.descripcion, Validators.required),
                                'img': new FormControl(this.producto.img, Validators.required)
                              });
                        });
                    this.service.getProviders(this.uri).subscribe(data => {
                        if ( data ) {
                            this.submitted = true;
                            for (let i = 0; i < data.length; i++) {
                                const element: any = data[i];
                                this.provService.getU(element.Proveedor_idProveedor)
                                .subscribe(data => {
                                    this.proveedores.push(data);
                                });
                            }
                        }
                    });
                }
            });
        } else {
            this.router.navigate(['/login/access']);
        }


    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            this.texto = 'Debe llenar todos los campos';
            this.tipo = 'warning';
            return;
        }

        if (this.uri == 'nuevo') {
            this.loading = false;
            this.service.post(this.loginForm.value, this.proveedores)
            .subscribe(res => {
                if (res) {
                    this.texto = 'El producto se agrego con exito';
                    this.tipo = 'success';
                    this.validar = true;
                    setTimeout(() => {
                        this.router.navigate(['/dashboard/admin/producto']);
                        }, 2000);
                } else {
                    this.texto = 'Parece que ha habido un problema, intentelo de nuevo mas tarde';
                    this.tipo = 'danger';
                }
            });
        } else {
            this.service.put(this.loginForm.value, this.proveedores, this.uri)
                .subscribe(res => {
                    if (res) {
                        this.texto = 'El producto se edito con exito';
                        this.tipo = 'info';
                        this.validar = true;
                        setTimeout(() => {
                        this.router.navigate(['/dashboard/admin/producto']);
                        }, 2000);
                    }
                });
        }
    }
    regresar() {
        this.router.navigate(['/dashboard/admin/producto']);
    }
    agregar() {
        this.loading = false;
        let p = (<HTMLInputElement>document.getElementById('selectB')).value;
        this.proveedor.forEach(x => {
            if (p== x.idProveedor) {
                this.provService.getU(p).subscribe(data => {
                    if ( this.proveedores.length === 0 ) {
                        this.proveedores.push(data);
                    } else {
                        this.prov = data;
                        for ( let p of this.proveedores ) {
                            if ( p.idProveedor !== this.prov.idProveedor ) {
                                this.proveedores.push(this.prov);
                                break;
                            } else {
                                console.log('no funciono');
                            }
                        }
                    }
                });
            }
        });
    }
    eliminar(p) {
        let object = p;
        var index = this.proveedores.indexOf(object);
        if (index > -1) {
            this.proveedores.splice(index, 1);
        }
        if ( this.proveedores.length === 0 ) {
            this.loading = true;
        }
    }
}