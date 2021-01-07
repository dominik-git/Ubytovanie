import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    FormGroupName,
    Validators,
} from '@angular/forms';
import { PersonalInfoResourceService } from '../../service/personalInfo.resource.service';
import { PersonalDataModel } from '../../model/personalData.model';
import { DormitoryResourceService } from '../../service/dormitory.resource.service';
import { DormitoryModel } from '../../model/dormitory.model';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Subject } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'app-multi-step-form',
    templateUrl: './multi-step-form.component.html',
    styleUrls: ['./multi-step-form.component.scss'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false },
        },
    ],
})
export class MultiStepFormComponent implements OnInit {
    @Input() formContent: any;
    @Output() readonly formSubmit: EventEmitter<any> = new EventEmitter<any>();

    activeStepIndex: number;
    currentFormContent: Array<any>;
    formData: any;
    formFields: Array<Array<string>>;
    masterFormFields: Array<string>;
    stepItems: Array<any>;
    masterForm: Array<FormGroup>;
    form: FormGroup;
    controls: { [key: string]: AbstractControl };

    personalData: PersonalDataModel;
    dormitories: DormitoryModel[];
    isLastStep: false;

    constructor(
        private _formBuilder: FormBuilder,
        private _cd: ChangeDetectorRef,
        private _personalInfoResourceService: PersonalInfoResourceService,
        private _dormitoryResourceService: DormitoryResourceService,
    ) {}

  public onStepChange(event: any): void {
    console.log(event.selectedIndex);
    this.activeStepIndex = event.selectedIndex;
  }

    ngOnInit() {
        this.activeStepIndex = 0;
        this.masterForm = [];
        this.currentFormContent = [];
        this.formFields = [];
        this.stepItems = this.formContent;


        // this.stepItems.forEach((data, i) => {
        //   this.currentFormContent.push(this.stepItems[i]["data"]); // holds name, validators, placeholder of all steps
        //   this.formFields.push(Object.keys(this.currentFormContent[i])); // holds string values for each field of all steps
        //   console.log(this.formFields);
        //   this.masterForm.push(this.buildForm(this.currentFormContent[i])); // holds all form groups
        // });
        this._personalInfoResourceService.getPersonalInfo().subscribe((response) => {
            console.log(response);
            this.personalData = response[0];
        });

        this._dormitoryResourceService.getAllDormitory().subscribe((response) => {
            console.log(response);
            this.dormitories = response;
        });
        this.buildForm1();
        this.buildForm2();
        this.buildForm3();
        // this.buildForm4();
    }

    buildForm1() {
        const group: any = {
            confirmBox: new FormControl(false, [Validators.requiredTrue]),
        };
        this.masterForm.push(this._formBuilder.group(group));
    }

    buildForm2() {
        const group: any = {
            dormitory: new FormControl(null, [Validators.required]),
            dormitoryNotice: new FormControl(null),
        };
        this.masterForm.push(this._formBuilder.group(group));
    }

    buildForm3() {
        const group = {
            distance: new FormControl(null),
            numberOfStops: new FormControl(null),
            orphan: new FormGroup({
                value: new FormControl(false),
                attachments: new FormArray([new FormControl()]),
            }),
            halfOrphan: new FormGroup({
                value: new FormControl(false),
                attachments: new FormArray([new FormControl()]),
            }),
            membershipInSir: new FormGroup({
                value: new FormControl(false),
                attachments: new FormArray([new FormControl()]),
            }),
            membershipInAs: new FormGroup({
                value: new FormControl(false),
                attachments: new FormArray([new FormControl()]),
            }),
            studyAverage: new FormGroup({
                value: new FormControl(''),
                attachments: new FormControl(30),
            }),
            upjsActivities: new FormGroup({
                value: new FormControl(false),
                attachments: new FormArray([new FormControl()]),
            }),
            breachOfOrder: new FormControl(false),
            ztp: new FormGroup({
                value: new FormControl(false),
                attachments: new FormArray([new FormControl()]),
            }),
            totalPoints: new FormControl(null),
        };
        this.masterForm.push(this._formBuilder.group(group));
    }

    // buildForm4() {
    //     const group: any = {
    //         distance: new FormControl(null, [Validators.required]),
    //         stopCount: new FormControl(null),
    //         totalPoints: new FormControl(null),
    //     };
    //     this.masterForm.push(this._formBuilder.group(group));
    // }


    onLastStepChange(event) {
        this.isLastStep = event;
        console.log(event);
    }
}
