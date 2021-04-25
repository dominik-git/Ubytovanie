import { Component, Input, OnInit } from '@angular/core';
import { SpinnerPositionType } from './spiner-possition-type-enum';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
    get visible() {
        return this._value;
    }

    @Input()
    set visible(value: boolean) {
        if (value) {
            this._value = true;
            if (this.delayTimeout) {
                clearTimeout(this.delayTimeout);
                this.delayTimeout = null;
            }
        } else {
            this.delayTimeout = setTimeout(() => {
                this._value = false;
            }, this.delay);
        }
    }

    @Input() public delay: number;

    private _value: boolean;
    private delayTimeout: any;
}
