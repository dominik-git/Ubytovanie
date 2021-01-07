import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import { PersonalDataModel } from '../../model/personalData.model';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss']
})
export class PersonalInfoFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() personalData: PersonalDataModel;
  constructor() { }

  ngOnInit(): void {
  }

  getFullName(): string {
    return ` ${this.personalData?.firstName} ${this.personalData?.lastName} `;
  }

}
