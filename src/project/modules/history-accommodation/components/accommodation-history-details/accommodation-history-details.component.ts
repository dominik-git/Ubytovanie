import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-accommodation-history-details',
    templateUrl: './accommodation-history-details.component.html',
    styleUrls: ['./accommodation-history-details.component.scss'],
})
export class AccommodationHistoryDetailsComponent implements OnInit {
    @Input('accommodationRequests') accommodationRequests;
    constructor() {}

    ngOnInit(): void {}
}
