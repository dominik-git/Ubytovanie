import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormControl, Validators } from '@angular/forms';
import { RequestPointModel } from '../../../new-accommodation/model/requestPoint.model';

@Component({
    selector: 'app-attachement',
    templateUrl: './attachement.component.html',
    styleUrls: ['./attachement.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachementComponent implements OnInit, OnDestroy {
    @Input() disabled = false;
    @Input() controlsArray: FormArray;
    @Input() criteriaPoint: RequestPointModel;
    @Input() hideEmpty: boolean;

    constructor() {}

    ngOnInit() {
        if (this.controlsArray?.length === 0) {
            this.createAttachmentFormControl();
        }
    }
    ngOnDestroy(): void {
        this.controlsArray.clear();
    }

    public removeAttachement(index) {
        this.controlsArray.removeAt(index);
    }

    public onFileChange(event) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            this.createAttachmentFormControl();
        }
    }

    download(control: AbstractControl) {
        // @ts-ignore
        const file = control.value._files[0];
        const fileType: string = file.type;
        const blob = new Blob([file], { type: fileType });
        const url = URL.createObjectURL(blob);
        window.open(url, 'Download');
    }
    hasRequiredField(abstractControl: AbstractControl): boolean {
        if (abstractControl.validator) {
            const validator = abstractControl.validator({} as AbstractControl);
            if (validator && validator.required) {
                return true;
            }
        }
        return false;
    }

    private createAttachmentFormControl(): void {
        if (
            this.criteriaPoint.povoleniePrilohy !== null &&
            this.criteriaPoint.povoleniePrilohy?.id === 3 &&
            this.controlsArray?.length < 1
        ) {
            this.controlsArray.push(new FormControl(undefined, Validators.required));
        } else {
            this.controlsArray.push(new FormControl(undefined));
        }
    }
}
