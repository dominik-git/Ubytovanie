import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'ais-login-lib';

@Injectable()
export class AisResourceService {
    private readonly url = 'https://ais2-vyvoj.science.upjs.sk/ais/rest/portal';
    constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

    getAccommodationRequests(): Observable<any[]> {
        const options = {
            headers: new HttpHeaders().set('AISAuth', this.token),
        };
        return this.http.get<any[]>(this.url + '/ubytovanie/ziadosti', options);
    }

    getAccommodationRequestById(id: number): Observable<any[]> {
        const options = {
            headers: new HttpHeaders().set('AISAuth', this.token),
        };
        return this.http.get<any[]>(this.url + `/ubytovanie/ziadost/${id}`, options);
    }

    getActiveAccomodationByQuery(id: string, akkRok: string) {
        const options = {
            headers: new HttpHeaders().set('AISAuth', this.token),
            params: new HttpParams().set('akRok', akkRok).set('idStudium', id),
        };
        return this.http.get<any[]>(this.url + '/ubytovanie/ziadost', options);
    }

    getUserInfo() {
        const options = {
            headers: new HttpHeaders().set('AISAuth', this.token),
        };
        return this.http.get<any[]>('https://ais2-vyvoj.science.upjs.sk/ais/rest/portal/users/info', options);
    }

    getDormitoryByFaculty(code: string) {
        const options = {
            headers: new HttpHeaders().set('AISAuth', this.token),
            params: new HttpParams().set('fakulta', code),
        };
        return this.http.get<any[]>(this.url + '/ubytovanie/internaty', options);
    }

    get token() {
        const accessToken = this.authService.tokenValue;
        return accessToken ? accessToken.access_token : '';
    }
}
