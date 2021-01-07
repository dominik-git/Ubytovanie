import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { PersonalDataModel } from '../../model/personalData.model';

@Component({
    selector: 'app-points-form',
    templateUrl: './points-form.component.html',
    styleUrls: ['./points-form.component.scss'],
})
export class PointsFormComponent implements OnInit {
    @Output() newItemEvent = new EventEmitter<boolean>();

    @Input() form: FormGroup;
    @Input() personalData: PersonalDataModel;
    controls: { [key: string]: AbstractControl };
    totalPoints = 0;

    get orphanCheckbox() {
        return  this.form.get('orphan') as FormGroup;
    }

    get halfOrphanCheckbox() {
        return this.form.get('halfOrphan') as FormGroup;
    }

    get membershipInAsCheckbox() {
        return this.form.get('membershipInAs') as FormGroup;
    }

    get membershipInSirCheckbox() {
        return this.form.get('membershipInSir') as FormGroup;
    }

    get studyAverageCheckbox() {
        return this.form.get('studyAverage') as FormGroup;
    }

    get breachOfOrderCheckbox() {
        return this.form.get('breachOfOrder') as FormGroup;
    }

    get upjsActivitiesCheckbox() {
        return this.form.get('upjsActivities') as FormGroup;
    }

    get ztpCheckbox() {
        return this.form.get('ztp') as FormGroup;
    }

    constructor() {}

    ngOnInit(): void {
        this.controls = this.form.controls;
        console.log(this.controls);
        // this.controls.dormitory.patchValue(this.defaultDormitory.id);

        // this.form.controls[].valueChanges.subscribe(val => {
        //   console.log(val);
        // });
    }

    // tslint:disable-next-line:align
    onCheckboxChange(event: any | string) {
        console.log(event);
        // if (this.form.get(event).get('selected').value) {
        //     this.totalPoints += this.form.get(event).get('value').value;
        // } else {
        //     this.totalPoints -= this.form.get(event).get('value').value;
        // }
        // console.log(this.totalPoints);
        // this.form.get('totalPoints').setValue(this.totalPoints);
    }

    decreasePoints() {
        const input = this.form.get('breachOfOrder');
        if (input.get('selected').value) {
            this.totalPoints -= input.get('value').value;
        } else {
            this.totalPoints -= input.get('value').value;
        }
    }

    addNewItem() {
        this.newItemEvent.emit(true);
    }

    isRadioSelected(name: string): boolean {
      return this.form.get(name).get('value').value;
    }

    // onCheckboxChange(key: number): void {
    //
    //   const points = this.form.controls[key].value;
    //   const state = this.form.controls[key].se
    //   this.totalPoints = this.totalPoints +
    // }
}
