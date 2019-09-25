
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Proveedor } from '../api/models/proveedo';

@Injectable(/*{ providedIn: 'root' }*/)
export class ProveedorService {
    URI = 'http://localhost:3000/api/v1/ws/db';
    
    constructor(private http: HttpClient) { }

    get() {
        var headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});
        return this.http.get<Proveedor[]>(`${this.URI}/proveedor/`).pipe(map(prov => {
                return prov;
            }));
    }

    getU(id: any) {
        console.log(id)
        var headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});
        return this.http.get<Proveedor[]>(`${this.URI}/proveedor/${id}`).pipe(map(user => {
                return user;
            }));
    }

    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.delete(`${this.URI}/proveedor/${id}`, { headers }).pipe(map(user => {
            return user;
        }));
    }
    post(proveedor:any) {
        let data = JSON.stringify(proveedor);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/proveedor/`, data, { headers }).pipe(map(user => {
            return user;
        }));
    }
    put(proveedor:any, id:any) {
        let data = JSON.stringify(proveedor);
        console.log(data);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.put(`${this.URI}/proveedor/${id}`, data, { headers }).pipe(map(user => {
            return user;
        }));
    }
}
