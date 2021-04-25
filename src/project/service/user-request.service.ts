import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class UserRequestService {
    private userRequestInfo = new BehaviorSubject('');
    userRequestInfo$ = this.userRequestInfo.asObservable();

    constructor() {}

    public setUserRequestName(name: string): void {
        this.userRequestInfo.next(name);
    }
}
