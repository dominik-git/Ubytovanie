import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-attachement',
    templateUrl: './attachement.component.html',
    styleUrls: ['./attachement.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachementComponent implements OnInit {
    @Input() control;
    @Input() label = '';
    @Input() labelClass = '';
    @Input() controlClass = '';
    @Input() clientId: number;
    @Input() readOnly = false;
    @Input() form: FormGroup;
    @Input() errorsClass = '';
    @Input() mainCaseWorkerId?: number;
    @Input() singleOption = false;
    @Input() disabled = false;
    @Input() group: FormArray;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {}

    public removeAttachement(index) {
        this.group.removeAt(index);
        console.log(this.group.getRawValue());
    }

    public change(event: any) {
        console.log(event.target.files);
        console.log(this.group.getRawValue());
    }

    public onFileChange(event) {
        console.log(event);
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

    private createAttachmentFormControl(): void {
        this.group.push(new FormControl(''));
    }
}
