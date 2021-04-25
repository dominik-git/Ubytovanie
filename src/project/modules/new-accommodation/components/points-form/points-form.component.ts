import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonalDataModel } from '../../../../../app/model/personalData.model';
import { AccommodationRequestService } from '../../service/accommodation-request.service';
import { RequestPointModel } from '../../model/requestPoint.model';
import { PointFormModel } from '../../model/PointForm.model';
import { MatRadioChange } from '@angular/material/radio';

@Component({
    selector: 'app-points-form',
    templateUrl: './points-form.component.html',
    styleUrls: ['./points-form.component.scss'],
})
export class PointsFormComponent implements OnInit {
    @Output() newItemEvent = new EventEmitter<boolean>();

    @Input() form: FormGroup;
    @Input() personalData: PersonalDataModel;
    controls: PointFormModel[] = [] as any;
    totalPoints = 0;
    formGroupAsArray = [];
    accommodationRequest;
    isLoading: boolean;

    constructor(private accommodationRequestService: AccommodationRequestService) {}

    ngOnInit(): void {
        console.log('init');
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

    onRadioInputChange(event: MatRadioChange, group, ziadost: RequestPointModel) {
        const d = (group.controls as unknown) as PointFormModel;
        if (event.value) {
            d.suma.setValue(ziadost.pocetBodov);
            this.totalPoints += ziadost.pocetBodov;
        } else {
            this.totalPoints -= ziadost.pocetBodov;
            d.suma.setValue(null);
        }
        this.form.controls.body.setValue(this.totalPoints);
    }

    onInputChange(event: Event, group, ziadost: RequestPointModel) {
        const controls = (group.controls as unknown) as PointFormModel;
        const inputValue: number = Number(controls.hodnota.value);
        if (!inputValue) {
            controls.suma.setValue(null);
            return;
        }
        if (inputValue > ziadost.maxHodnota && ziadost.maxHodnota) {
            controls.suma.setValue(null);
            return;
        }
        if (inputValue < ziadost.minHodnota && ziadost.minHodnota) {
            controls.suma.setValue(null);
            return;
        }

        let result = inputValue * ziadost.pocetBodov;
        result = ziadost.posun ? result + ziadost.posun : result;

        if (ziadost.hornaHranica && ziadost.hornaHranica < result) {
            result = ziadost.hornaHranica;
        }
        if (ziadost.dolnaHranica !== null && ziadost.dolnaHranica > result) {
            result = null;
        }
        this.totalPoints += result;
        this.form.controls.body.setValue(this.totalPoints);
        controls.suma.setValue(result);
    }

    controlContainsCheckBox(control) {
        return control.value.hasOwnProperty('checkboxHodnota');
    }

    isAttachmentVisible(ziadost: RequestPointModel) {
        return ziadost.povoleniePrilohy !== null && ziadost.povoleniePrilohy?.id !== 1;
    }

    submitForm() {
        console.log(this.form.getRawValue());
    }
}
