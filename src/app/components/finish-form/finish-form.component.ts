import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { PersonalDataModel } from '../../model/personalData.model';
import { Observable, of } from 'rxjs';
@Component({
    selector: 'app-finish-form',
    templateUrl: './finish-form.component.html',
    styleUrls: ['./finish-form.component.scss'],
})
export class FinishFormComponent implements OnInit, OnChanges {
    @Input() form: FormGroup;
    @Input() masterForm: FormGroup[];
    formData;
    controls: { [key: string]: AbstractControl };

    constructor() {}

    ngOnInit(): void {
        this.controls = this.form.controls;
        this.formData = this.masterForm.reduce(
            (masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }),
            {},
        );
        console.log(this.formData);
        this.getData().subscribe((data) => {
            console.log(data);
        });
        // this.controls.dormitory.patchValue(this.defaultDormitory.id);
    }

    submit() {
        const data = this.masterForm.reduce((masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }), {});
        console.log(data);
    }

    isTypeOfFormGroup(formControl: string): void {
        const control = this.form.get(formControl);
        // if(typeof control == Object )
        console.log(typeof control);
    }

    download(group: string, index: number) {
        // @ts-ignore
        const file = this.form.get(group)?.controls[index].value._files[0];
        const fileType: string = file.type;
        const blob = new Blob([file], { type: fileType });
        const url = URL.createObjectURL(blob);
        window.open(url, 'Download');
    }

    getData(): Observable<any> {
        return of(this.masterForm.reduce((masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }), {}));
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        this.formData = this.masterForm.reduce(
            (masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }),
            {},
        );
    }
}
