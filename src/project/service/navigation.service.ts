import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private isSmallScreen$ = new BehaviorSubject(false);

    constructor() {}

    changeState(myChange: boolean) {
        this.isSmallScreen$.next(myChange);
        console.log(myChange);
    }

    getState(): Observable<boolean> {
        return this.isSmallScreen$.asObservable();
    }
}
