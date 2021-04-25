import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

@Component({
    selector: 'app-attachment-present',
    templateUrl: './attachment-present.component.html',
    styleUrls: ['./attachment-present.component.scss'],
})
export class AttachmentPresentComponent implements OnInit {
    @Input() controlsArray: FormArray;

    constructor() {}

    ngOnInit(): void {}

    getFileName(control: AbstractControl): string {
        let fileName = '';
        if (control.value !== null) {
            fileName = control.value._files[0].name;
            return fileName;
        }
        return fileName;
    }

    download(control: AbstractControl): void {
        // @ts-ignore
        const file = control.value._files[0];
        const fileType: string = file.type;
        const blob = new Blob([file], { type: fileType });
        const url = URL.createObjectURL(blob);
        window.open(url, 'Download');
    }

    hasControlValue(abstractControl: AbstractControl): boolean {
        return !(abstractControl.value === null || abstractControl.value === '');
    }
}
