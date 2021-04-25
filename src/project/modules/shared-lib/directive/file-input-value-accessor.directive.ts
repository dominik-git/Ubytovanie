import { ChangeDetectorRef, Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[appFileInputValueAccessor]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FileInputValueAccessorDirective,
            multi: true,
        },
    ],
})
export class FileInputValueAccessorDirective implements ControlValueAccessor {
    private elementRef: ElementRef;
    private onChangeCallback: any;
    private onTouchedCallback: any;

    constructor(elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
        this.elementRef = elementRef;
        console.log(elementRef);
    }
    @HostListener('blur') onMouseEnter() {
        this.onTouchedCallback();
    }

    @HostListener('change') onMouseLeave() {
        // @ts-ignore
      this.handleChange($event.target.files);
    }

    // tslint:disable-next-line:ban-types
    public registerOnChange(callback: Function): void {
        this.onChangeCallback = callback;
    }

    // tslint:disable-next-line:ban-types
    public registerOnTouched(callback: Function): void {
        this.onTouchedCallback = callback;
    }

    // I set the disabled property of the file input element.
    public setDisabledState(isDisabled: boolean): void {
        this.elementRef.nativeElement.disabled = isDisabled;
    }

    public writeValue(value: any): void {
      console.log("write value")
        if (value instanceof FileList) {
            this.elementRef.nativeElement.files = value;
        } else if (Array.isArray(value) && !value.length) {
            this.elementRef.nativeElement.files = null;
        } else if (value === null) {
            this.elementRef.nativeElement.files = null;
        } else {
            if (console && console.warn && console.log) {
                console.log('Ignoring attempt to assign non-FileList to input[type=file].');
                console.log('Value:', value);
            }
        }
    }

    public handleChange(files: FileList): void {
        if (this.elementRef.nativeElement.multiple) {
            this.onChangeCallback(Array.from(files));
        } else {
            const reader = new FileReader();

            reader.readAsDataURL(files[0]);

            reader.onload = () => {
                this.onChangeCallback(files.length ? reader.result.toString().split(',')[1] : null);
                this.changeDetectorRef.markForCheck();
            };
        }
    }
}
