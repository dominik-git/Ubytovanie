import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DormitoryModel } from '../../../../../app/model/dormitory.model';
import { AccommodationRequestService } from '../../service/accommodation-request.service';

@Component({
    selector: 'app-accommodation-form',
    templateUrl: './accommodation-form.component.html',
    styleUrls: ['./accommodation-form.component.scss'],
})
export class AccommodationFormComponent implements OnInit {
    @Input() form: FormGroup;
    dormitories: any[];
    controls: { [key: string]: AbstractControl };

    constructor(private accommodationRequestService: AccommodationRequestService) {}

    ngOnInit(): void {
        this.accommodationRequestService.dormitories$.subscribe((res) => {
            this.dormitories = res;
        });
        this.controls = this.form.controls;
        // this.controls.dormitory.patchValue(this.defaultDormitory.id);
    }
}
