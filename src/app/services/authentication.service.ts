import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//import { environment } from '@environments/environment';
import { User } from '../api/models/usuario';

@Injectable( /*{ providedIn: 'root' }*/ )
export class AuthenticationService {

    URI = 'http://localhost:3000/api/ws/db';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    login(usuario:any) {
        let uriUsuario: string = 'http://localhost:3000/auth/'; 
        let head = new HttpHeaders();
        head.append('Content-Type', 'application/json');

        var data = {
            username: usuario.username,
            password: usuario.password
        }
        console.log(data);

        return this.http.post<any>(uriUsuario, data, {headers : head})
            .pipe(map(user => {
                var userData = {
                    nombre: user.nombre,
                    password: user.pass,
                    username: user.username,
                    tok: user.token
                }
                user.authdata = window.btoa(usuario.username + ':' + usuario.password);
                localStorage.setItem('token', JSON.stringify(userData));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }
}