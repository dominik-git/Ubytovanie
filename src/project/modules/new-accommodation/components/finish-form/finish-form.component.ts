import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { PersonalDataModel } from '../../../../../app/model/personalData.model';
import { Observable, of } from 'rxjs';
import { AisResourceService } from '../../../../service/ais-resource.service';
import { PointFormModel } from '../../model/PointForm.model';
import { RequestPointModel } from '../../model/requestPoint.model';
import { AccommodationRequestService } from '../../service/accommodation-request.service';
@Component({
    selector: 'app-finish-form',
    templateUrl: './finish-form.component.html',
    styleUrls: ['./finish-form.component.scss'],
})
export class FinishFormComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() masterForm: FormGroup[];
    formData;
    controls;
    public accommodationRequest;
    isLoading: boolean;

    constructor(
        private aisResourceService: AisResourceService,
        private accommodationRequestService: AccommodationRequestService,
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        // @ts-ignore
        this.controls = (this.form.controls.bodyKriteria.controls as unknown) as PointFormModel[];
        // @ts-ignore
        // this.controls = controls;

        this.accommodationRequestService.accommodationRequest$.subscribe((data) => {
            this.accommodationRequest = data;
            this.isLoading = false;
        });
    }
    getRequestPoint(control) {
        const ctr = (control.controls as unknown) as PointFormModel;
        const result: RequestPointModel = this.accommodationRequest.bodKriteria.find(
            (point) => point.id === Number(ctr.id.value),
        );
        return result;
    }

    controlContainsCheckBox(control) {
        return control.value.hasOwnProperty('checkboxHodnota');
    }
}
