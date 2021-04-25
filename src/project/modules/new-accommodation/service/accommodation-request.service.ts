import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AccommodationRequestService {
    private accommodationRequest = new BehaviorSubject(null);
    accommodationRequest$: Observable<any> = this.accommodationRequest.asObservable();

    private dormitories = new BehaviorSubject(null);
    dormitories$: Observable<any> = this.dormitories.asObservable();

    constructor() {}

    public setAccommodationRequest(request): void {
        this.accommodationRequest.next(request);
    }

    public setDormitories(dormitories: any[]): void {
        this.dormitories.next(dormitories);
    }
}
