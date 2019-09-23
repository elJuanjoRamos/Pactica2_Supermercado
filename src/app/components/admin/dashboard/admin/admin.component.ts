import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styles: []
  })
  export class AdminComponent implements OnInit{
    usuario: any;
    constructor( ) {
    }
    ngOnInit(){}
}

