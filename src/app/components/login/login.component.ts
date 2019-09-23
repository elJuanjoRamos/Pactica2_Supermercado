import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../api/models/usuario';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
  })
  export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    usuarioLogueado: User;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/dashboard/admin/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.usuarioLogueado = data;
                    if ( this.usuarioLogueado.Rol_idRol === 1 ) {
                        console.log('entro');
                        this.router.navigate(['/dashboard/admin']);
                    } else {
                        this.router.navigate(['/dashboard/user']);
                    }
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}