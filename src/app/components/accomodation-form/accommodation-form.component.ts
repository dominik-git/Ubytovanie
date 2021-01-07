import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DormitoryModel } from '../../model/dormitory.model';

@Component({
  selector: 'app-accommodation-form',
  templateUrl: './accommodation-form.component.html',
  styleUrls: ['./accommodation-form.component.scss']
})
export class AccommodationFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() dormitories: DormitoryModel[];
  defaultDormitory: DormitoryModel;
  controls: { [key: string]: AbstractControl };


  constructor() { }

  ngOnInit(): void {
    this.defaultDormitory = this.dormitories ? this.dormitories[0]: null;
    // this.form.controls.ge.setValue(this.defaultDormitory.fullName);
    console.log(this.defaultDormitory);

    this.controls = this.form.controls;
    // this.controls.dormitory.patchValue(this.defaultDormitory.id);
  }





}
