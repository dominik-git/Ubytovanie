import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanDeactivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'ais-login-lib';



@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {
    constructor( private authService: AuthService, private router: Router) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.tokenValue) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }
}
