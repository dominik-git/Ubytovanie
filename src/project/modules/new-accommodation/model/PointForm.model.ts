import { TypedFormArray, TypedFormControl } from '../../shared-lib/util';

export interface PointFormModel {
    id: TypedFormControl<number>;
    hodnota: TypedFormControl<number>;
    suma: TypedFormControl<number>;
    prilohy?: TypedFormArray<TypedFormControl<any>>;
    checkboxHodnota?: TypedFormControl<boolean>;
}

export interface PointFormGroupModel {
    bodyKriteria: PointFormModel[];
    body: TypedFormControl<string>;
}

export interface PersonalInfoFormModel {
    confirmBox: TypedFormControl<boolean>;
}

export interface DormitoryFormModel {
    internat: TypedFormControl<string>;
    poznamka: TypedFormControl<string>;
}

export interface AccommodationFormModel {
    osobneInfo: PersonalInfoFormModel;
    ubytovanie: DormitoryFormModel;
    bodyKriteria: PointFormModel[];
}
