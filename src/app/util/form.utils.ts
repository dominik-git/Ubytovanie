import { BehaviorSubject } from 'rxjs';

import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';




// export interface IndexedAbstractControl {
//     [key: string]: AbstractControl;
// }

export interface TypedFormControl<T> extends AbstractControl {
    value: T;
}

// export type TypedFormGroup<T> = FormGroup & { controls: T };
// todo, cannot extends FormGroup and have strong types
export interface TypedFormGroup<T> extends AbstractControl {
    controls: T;
}

// export type TypedFormArray<T> = FormArray & { controls: T[] };
export interface TypedFormArray<T extends AbstractControl> extends FormArray {
    controls: T[];
}

export type TypedFormBuilderGroup<T> = {
    [P in keyof T]: any;
};



export class FormUtils {
    /**
     * Toggle single error for form control
     * For example FormUtils.setError(inputField, 'notFound', true)
     */
    public static setError(formControl: AbstractControl, validatorName: string, hasError: boolean) {
        let errors = formControl.errors || {};
        if (hasError && !errors[validatorName]) {
            errors[validatorName] = true;
            formControl.setErrors(errors);
        } else if (!hasError && errors[validatorName]) {
            delete errors[validatorName];
            if (Object.getOwnPropertyNames(errors).length === 0) {
                errors = null;
            }
            formControl.setErrors(errors);
        }
    }
    /**
     *
     * @param form form group to inspect
     * @returns array of validation error objects
     */
    public static getFormGroupValidationErrors(form: FormGroup) {
        const result = [];
        Object.keys(form.controls).forEach(key => {
            const controlErrors: ValidationErrors = form.get(key).errors;
            if (controlErrors) {
                Object.keys(controlErrors).forEach(keyError => {
                    result.push({
                        'control ': key,
                        error: keyError,
                        value: controlErrors[keyError],
                    });
                });
            }
        });

        return result;
    }
    /**
     * Calls `AbstractControl` `enable()` or `disable()` methods based on control state and `isEnabled` flag
     *
     * Doesn't call `enable()` if control is already enabled. This prevents `valueChanges` method from `FormGroup` to trigger
     *
     * @param control control to change
     * @param isEnabled flag
     * @param resetOnDisable flag
     */
    public static setEnabled(control: AbstractControl, isEnabled: boolean, resetOnDisable = false) {
        if (isEnabled) {
            if (control.disabled) {
                control.enable();
            }
        } else {
            if (control.enabled) {
                if (resetOnDisable) {
                    control.reset();
                }
                control.disable();
            }
        }
    }

    /**
     * Marks all controls in a form group as touched
     * @param formGroup - The form group to touch
     */
    public static markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    /**
     * Marks all controls in a form group as untouched
     * @param formGroup - The form group to untouch
     */
    public static markFormGroupUntouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsUntouched();

            if (control.controls) {
                this.markFormGroupUntouched(control);
            }
        });
    }

  public static getFlytRootParent(form: AbstractControl) {
    let parent = form.parent;
    if (!parent) {
      return form;
    }
    while (parent.parent) {
      parent = parent.parent;
    }

    return parent;
  }
}
