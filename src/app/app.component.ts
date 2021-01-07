import {Component, OnInit} from '@angular/core';
import { STEP_ITEMS } from './constants/multi-step-form';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formContent: any;
  formData: any;
  activeStepIndex: number;
  title = 'Ubytovanie';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.formContent = STEP_ITEMS;
    this.formData = {};
  }

  onFormSubmit(formData: any): void {
    this.formData = formData;

    // post form data here
    alert(JSON.stringify(this.formData));
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
