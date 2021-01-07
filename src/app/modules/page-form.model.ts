import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {FormUtils} from "../util/form.utils";


export interface HasSelId {
    selId: string;
}

export interface HasDisabled {
    disabled: boolean;
}

export interface HasReadOnly {
    readOnly: boolean;
}

export interface HasLabelClass {
    labelClass: string;
}

export interface HasLabel extends HasLabelClass {
    label: string;
}

export interface HasText {
    text: string;
}

export interface HasControlClass {
    controlClass: string;
}

export interface HasControl<TC> extends HasControlClass {
    control: TC;
}

// export interface HasSubmitted {
//     submitted: boolean;
// }

export interface HasErrorClass {
    errorsClass: string;
}

export interface HasPlacehoder {
    placeholder: string;
}

/**
 * @abstract
 * Provides common values for easier component writing.
 *
 * @property value - property value that should be bind to FormControl
 * @property control - FormControl reference ( implements HasControl )
 * @property controlClass - additional class to add for control ( implements HasControl )
 * @property readOnly - used to make this control readonly or editable ( implements HasReadOnly )
 * @property selId - selenium id ( implements HasSelId )
 * @property pageLabelClass - required class to add for label, if control has Validators.required
 * @property submitted - value from FlytFormGroup.submitted observable
 * @property destroy$ - common observable to be used with .takeUntil
 *
 */
@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class PageControl<TC extends AbstractControl, TV> implements HasSelId, HasControl<TC>, HasReadOnly {
    get value(): TV {
        return this.control.value;
    }

    @Input()
    set value(value: TV) {
        this.control.setValue(value);
        this._onChange(value);
        this._onTouched(value);
        this.cdr.markForCheck();
    }

    @Input() readOnly: boolean;
    @Input() selId: string;
    @Input() control: TC;
    @Input() controlClass = '';

    // has to be public to be used in html
    /** @protected */
    submitted: boolean;
    /** @protected */
    pageLabelClass = '';

    protected destroy$ = new ReplaySubject<boolean>(1);

    constructor(protected cdr: ChangeDetectorRef) {}

    pageOnInit() {
        assertSelId(this.selId);

        const { validator } = this.control;
        if (validator) {
            const validatorsEval = validator('' as any);
            if (validatorsEval && validatorsEval.required) {
                this.pageLabelClass = 'required';
                this.cdr.markForCheck();
            }
        }

        if (this.control) {
            this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(_ => {
                this.cdr.markForCheck();
            });
        }
    }

    pageOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    writeValue(value: TV): void {
        this.value = value;
        this.cdr.markForCheck();
    }

    protected _onChange: any = () => {};
    protected _onTouched: any = () => {};
}

export function assertSelId(selId: string) {
    if (!selId) {
        console.warn('Component missing selId');
    }
}

export function assertValue(value: any, msg: string) {
    if (!value) {
        console.error(msg);
    }
}
