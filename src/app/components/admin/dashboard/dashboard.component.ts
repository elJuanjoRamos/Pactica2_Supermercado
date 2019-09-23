import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../api/models/usuario';


@Component({
    selector: 'app-dash',
    templateUrl: './dashboard.component.html',
    styles: []
  })
  export class DashboardComponent implements OnInit{
    usuario: any;
    constructor( ) {
      this.usuario = JSON.parse(JSON.stringify(localStorage.getItem('token')));
      console.log(this.usuario);
    }
    ngOnInit(){}
}

