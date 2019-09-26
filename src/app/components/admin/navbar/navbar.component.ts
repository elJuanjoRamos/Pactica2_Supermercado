import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: []
  })
  export class NavBarComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {
    }
    cerrarSesion() {
      localStorage.clear();
      this.router.navigate(['/login/access']);
    }
}
