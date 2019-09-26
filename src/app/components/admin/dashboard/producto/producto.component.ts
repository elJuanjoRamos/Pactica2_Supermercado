import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {
  productos: any[];

  constructor(private service: ProductoService) { }

  ngOnInit() {
    this.inicializar();
  }

  inicializar() {
    this.service.getProductos().subscribe( data => {
      this.productos = data;
    });
  }
  borrar(id: any) {
    this.service.delete(id)
    .subscribe(res => {
      this.inicializar();
    });
  }
}
