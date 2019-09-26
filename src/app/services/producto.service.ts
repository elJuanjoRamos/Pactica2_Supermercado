
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Producto } from '../api/models/producto';

@Injectable(/*{ providedIn: 'root' }*/)
export class ProductoService {
    URI = 'http://localhost:3000/api/v1/ws/db';
    URI2 = 'http://localhost:3000/api/v1/ws/db';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }

    getProductos() {
        return this.http.get<Producto[]>(`${this.URI}/producto`).pipe(map(u => {
                return u;
            }));
    }

    getU(id: any) {
        return this.http.get<Producto[]>(`${this.URI}/producto/${id}`).pipe(map(u => {
                return u;
            }));
    }
    getProviders(id: any) {
        return this.http.get<Producto[]>(`${this.URI}/proveedor/producto/${id}`).pipe(map(u => {
                return u;
            }));
    }

    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.delete(`${this.URI}/producto/${id}`, { headers }).pipe(map(u => {
            return u;
        }));
    }
    post(producto:any, proveedores: any) {
        let data = {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            img: producto.img,
            precioVenta: parseFloat(parseFloat(producto.precioVenta).toFixed(2)),
            cantidad: producto.cantidad,
            proveedores: proveedores
        };
        console.log(data);
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/producto/`, data, { headers }).pipe(map(user => {
            return user;
        }));
    }
    put(producto:any, proveedores: any, id:any) {
        let data = {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            img: producto.img,
            precioVenta: parseFloat(parseFloat(producto.precioVenta).toFixed(2)),
            cantidad: producto.cantidad,
            proveedores: proveedores
        };
        console.log(data)
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.put(`${this.URI}/producto/${id}`, data, { headers }).pipe(map(user => {
            return user;
        }));
    }
}
