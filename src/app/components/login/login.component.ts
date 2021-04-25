import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { TokenModel } from '../../model/token.model';
import { AuthService } from 'ais-login-lib';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.initAuthService('t4ro3nEJAiH3kQfiTo4lrnG6vmwa', 'ROkidOYvyLwAgNn1KBeGzzSOHLIa');
        this.authService.token.subscribe((res) => {
            this.router.navigate(['/accommodation']);
        });
    }

    onLoginSuccess($event: TokenModel) {
        console.log('my token', $event);
        this.userService.setToken($event);
    }
    onLogoutSuccess($event) {}
}
