import { AbstractControl, FormArray } from '@angular/forms';

export interface TypedFormControl<T> extends AbstractControl {
    value: T;
    patchValue: (value: T, options?: Object) => void;
}

export interface TypedFormGroup<T> extends AbstractControl {
    controls: T;
}

export interface TypedFormArray<T extends AbstractControl> extends FormArray {
    controls: T[];
}

export type TypedFormBuilderGroup<T> = {
    [P in keyof T]: any;
};

