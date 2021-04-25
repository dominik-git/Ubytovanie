import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AisResourceService } from '../../service/ais-resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationRequestService } from './service/accommodation-request.service';
import { flatMap, tap } from 'rxjs/operators';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalDataModel } from '../../../app/model/personalData.model';
import { DormitoryModel } from '../../../app/model/dormitory.model';
import { TypedArraysIn, typedFormArray, typedFormControl, typedFormGroup } from 'ngx-forms-typed';
import { PointModel } from './model/point.model';
import { AttachmentModel } from './model/attachment.model';
import { TypedFormArray, TypedFormBuilderGroup, TypedFormControl } from '../shared-lib/util';
import {
    AccommodationFormModel,
    DormitoryFormModel,
    PersonalInfoFormModel,
    PointFormGroupModel,
    PointFormModel,
} from './model/PointForm.model';
import { RequestPointModel } from './model/requestPoint.model';
import { myFile } from './mocData/data';
import { FileInput } from 'ngx-material-file-input';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthService } from 'ais-login-lib';
import { NavigationService } from '../../service/navigation.service';

@Component({
    selector: 'app-new-accommodation',
    templateUrl: './new-accommodation.component.html',
    styleUrls: ['./new-accommodation.component.scss'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false },
        },
    ],
})
export class NewAccommodationComponent implements OnInit {
    requestYearFrom: number;
    requestYearTo: number;
    activeStepIndex: number;
    currentFormContent: Array<any>;
    formData: any;
    formFields: Array<Array<string>>;
    masterForm: Array<FormGroup>;
    form: FormGroup;
    controls: { [key: string]: AbstractControl };
    isLastStep: false;
    isSpinnerVisible = true;
    accommodationRequest: any;
    form1: FormGroup;
    isSmallScreen = true;

    constructor(
        private translate: TranslateService,
        private aisResourceService: AisResourceService,
        private route: ActivatedRoute,
        private accommodationRequestService: AccommodationRequestService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private navigationService: NavigationService,
    ) {
        translate.setDefaultLang('en');
        translate.use('en');
    }

    ngOnInit(): void {
        this.activeStepIndex = 0;
        this.masterForm = [];
        this.currentFormContent = [];
        this.formFields = [];
        this.formData = {};
        const requestId = this.route.snapshot.paramMap.get('id');
        const year = this.route.snapshot.paramMap.get('akRok');
        this.navigationService.getState().subscribe((state) => {
            this.isSmallScreen = state;
        });
        // @ts-ignore
        this.isSpinnerVisible = true;
        this.aisResourceService
            .getActiveAccomodationByQuery(requestId, year)
            .pipe(
                tap((res) => {
                    this.accommodationRequestService.setAccommodationRequest(res);
                    this.accommodationRequest = res;
                    // @ts-ignore
                    this.buildForms(res.bodKriteria);
                    // @ts-ignore
                    this.patchForm(res.bodKriteria);
                }),
                flatMap((data: any) => {
                    // @ts-ignore

                    return this.aisResourceService.getDormitoryByFaculty(data?.fakulta.kod);
                }),
            )
            .subscribe(
                (res) => {
                    this.accommodationRequestService.setDormitories(res);
                    this.isSpinnerVisible = false;
                },
                (err) => {
                    if (err.status === 401 || err.status === 403) {
                        this.authService.logout();
                        this.router.navigateByUrl(`/login`);
                    }
                },
            );
    }

    public onStepChange(event: any): void {
        this.activeStepIndex = event.selectedIndex;
    }

    onFormSubmit(formData: any): void {
        this.formData = formData;

        // post form data here
        alert(JSON.stringify(this.formData));
    }
    buildForms(points) {
        // build person form
        const personForm: TypedFormBuilderGroup<PersonalInfoFormModel> = {
            confirmBox: new FormControl(false, [Validators.requiredTrue]),
        };
        this.masterForm.push(this.formBuilder.group(personForm));

        // build dormitory form
        const dormitoryForm: TypedFormBuilderGroup<DormitoryFormModel> = {
            internat: new FormControl(null, [Validators.required]),
            poznamka: new FormControl(null),
        };
        this.masterForm.push(this.formBuilder.group(dormitoryForm));

        // build criteria form
        const formGroup: TypedFormBuilderGroup<PointFormGroupModel> = {
            bodyKriteria: new FormArray([]),
            body: new FormControl(null),
        };
        points.forEach((point) => {
            const groupOfControls: TypedFormBuilderGroup<PointFormModel> = this.buildPointGroupControl(point);
            formGroup.bodyKriteria.push(this.formBuilder.group(groupOfControls));
        });

        const form = this.formBuilder.group(formGroup);
        this.masterForm.push(form);
    }

    private buildPointGroupControl(point): TypedFormBuilderGroup<PointFormModel> {
        const valueValidators = [];
        if (point.minHodnota !== null) {
            valueValidators.push(Validators.min(point.minHodnota));
        }
        if (point.maxHodnota !== null) {
            valueValidators.push(Validators.max(point.maxHodnota));
            // valueValidators.push(Validators.required);
        }
        const groupWithoutCheckbox: TypedFormBuilderGroup<PointFormModel> = {
            id: [point.id, []],
            hodnota: [undefined, valueValidators],
            suma: [undefined, []],
            prilohy: new FormArray([]),
        };

        const groupWithCheckbox: TypedFormBuilderGroup<PointFormModel> = {
            id: [point.id, []],
            hodnota: [undefined, []],
            suma: [undefined, []],
            prilohy: new FormArray([]),
            checkboxHodnota: [undefined, []],
        };
        if (point?.binarne) {
            return groupWithCheckbox;
        } else {
            return groupWithoutCheckbox;
        }

        // group.value = typedFormControl<string>();
        // if (point.prilohy?.length > 0) {
        //     // @ts-ignore
        //     group.attachments = new FormArray([]);
        //     // @ts-ignore
        //     point.prilohy.forEach((attachment) => {
        //         // @ts-ignore
        //         group.attachments.push(typedFormControl<string>());
        //     });
        // } else {
        //     // @ts-ignore
        //
        //     group.attachments = TypedFormArray();
        //     // @ts-ignore
        //     group.attachment.push(typedFormControl<string>());
        // }
    }
    patchForm(points: RequestPointModel[]) {
        // const arrayBuffer = Uint8Array.from(window.atob(myFile), (c) => c.charCodeAt(0));
        // const file = new File([arrayBuffer], 'dummy.pdf', { type: 'application/pdf' });
        const files = [];
        // files.push(file);
        const controls = (this.masterForm[2].controls as unknown) as PointFormGroupModel;
        // @ts-ignore
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < controls.bodyKriteria.controls?.length; i++) {
            // @ts-ignore
            const groupControls = (controls.bodyKriteria.controls[i].controls as unknown) as PointFormModel;
            const criteriaPoint = this.getRequestPointById(groupControls.id.value);
            groupControls.hodnota.setValue(criteriaPoint.hodnota ? criteriaPoint.hodnota : undefined);
            groupControls.suma.setValue(criteriaPoint.suma ? criteriaPoint.suma : undefined);
            if (criteriaPoint.binarne && criteriaPoint.suma) {
                groupControls.checkboxHodnota.setValue(true);
            } else if (criteriaPoint.binarne) {
                groupControls.checkboxHodnota.setValue(false);
            }
            if (criteriaPoint.prilohy !== null && criteriaPoint.prilohy.length > 0) {
                criteriaPoint.prilohy.forEach((attachement) => {
                    groupControls.prilohy.push(new FormControl(new FileInput(files, ',')));
                });
                if (criteriaPoint.povoleniePrilohy?.id === 3) {
                    groupControls.prilohy.controls[0].setValidators([Validators.required]);
                    groupControls.prilohy.controls[0].updateValueAndValidity();
                }
            }
        }
    }

    public submitForm() {
        const data = this.masterForm.reduce((masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }), {});

        console.log(data);
    }
    private getRequestPointById(id: number): RequestPointModel {
        const result: RequestPointModel = this.accommodationRequest.bodKriteria.find(
            (point) => point.id === Number(id),
        );
        return result;
    }

    onLastStepChange(event) {
        this.isLastStep = event;
    }

    useLanguage(language: string) {
        this.translate.use(language);
    }
    private processAcademicYear(urlParam: string) {
        const yearArray = urlParam.split('/');
        this.requestYearFrom = Number(yearArray[0]);
        this.requestYearTo = Number(yearArray[1]);
    }
    private patchCoCaseWorkerForm(
        form: FormGroup,
        controlName: string,
        fb: FormBuilder,
        coCaseWorkers: any[] = [],
        mainCaseWorkerId: number | undefined,
    ) {
        if (form.controls[controlName]) {
            form.removeControl(controlName);
        }
        if (coCaseWorkers?.length === 0) {
            coCaseWorkers.push(undefined);
        }
        form.addControl(controlName, fb.array(coCaseWorkers.map((c) => this.createCoCaseWorkerControl(c))));
    }

    private createCoCaseWorkerControl(c) {
        return new FormControl(c);
    }
}
