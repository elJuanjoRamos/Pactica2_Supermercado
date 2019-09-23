import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styles: []
  })
  export class RegistroComponent implements OnInit{
    constructor(private router: Router, private activRoute: ActivatedRoute ) {
        this.activRoute.params.subscribe( params => {});
    }
    ngOnInit(){}
}

