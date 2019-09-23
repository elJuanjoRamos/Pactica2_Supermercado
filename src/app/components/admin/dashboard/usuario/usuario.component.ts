import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';


@Component({
    selector: 'app-adm-usuario',
    templateUrl: './usuario.component.html',
    styles: []
  })
  export class UsuarioComponent implements OnInit{
    usuario: any;
    filter:any;
    p:any;
    //| filter:filter | paginate: {itemsPerPage:50, currentPage: p}
    constructor(private service: UsuarioService ) {

    }
    ngOnInit() {
      this.inicializar();
            //[routerLink]="['/dashboard/categoria/detalles/', c.$key]"
    }
    public inicializar() {
      this.service.getUsuarios().subscribe(u => {
        this.usuario = u;
      });
    }
    borrar(usuario: any) {
      this.service.delete(usuario.idUsuario)
      .subscribe(res => {
        this.inicializar();
      });
    }
}

