import { Injectable } from '@angular/core';
import { TokenModel } from '../model/token.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private jwtToken: TokenModel = null;

    constructor() {}

    setToken(token: TokenModel): void {
        this.jwtToken = token;
    }
    getToken(): TokenModel {
        return this.jwtToken;
    }
}
