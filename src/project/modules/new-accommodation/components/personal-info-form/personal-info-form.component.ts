import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonalDataModel } from '../../../../../app/model/personalData.model';
import { AccommodationRequestService } from '../../service/accommodation-request.service';

@Component({
    selector: 'app-personal-info-form',
    templateUrl: './personal-info-form.component.html',
    styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() personalData: PersonalDataModel;

    accommodationRequest: any;

    constructor(private accommodationRequestService: AccommodationRequestService) {
        this.accommodationRequestService.accommodationRequest$.subscribe((res) => {
            this.accommodationRequest = res;
        });
    }

    ngOnInit(): void {
    }

    getFullName(): string {
        return ` ${this.personalData?.firstName} ${this.personalData?.lastName} `;
    }
}
