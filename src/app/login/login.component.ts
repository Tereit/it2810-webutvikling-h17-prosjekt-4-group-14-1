import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],

    animations: [routerTransition()],
    providers: [AuthService]
})
export class LoginComponent implements OnInit {
    constructor(public router: Router, public auth: AuthService) {}
    // login: boolean = true;
    // toggle() {
    //   this.login = !this.login;
    // }
    ngOnInit() {}

    // onLoggedin() {
    //     localStorage.setItem('isLoggedin', 'true');
    // }

    login() {
      this.auth.login();
    }

    logout() {
      this.auth.logout();
    }
}
