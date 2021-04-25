import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoFormComponent } from './components/personal-info-form/personal-info-form.component';
import { AccommodationFormComponent } from './components/accomodation-form/accommodation-form.component';
import { PointsFormComponent } from './components/points-form/points-form.component';
import { FinishFormComponent } from './components/finish-form/finish-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedLibModule } from '../shared-lib/shared-lib.module';
import { RouterModule, Routes } from '@angular/router';
import { ShowComponent } from './components/show/show.component';
import { NewAccommodationComponent } from './new-accommodation.component';

const routes: Routes = [
    {
        path: '',
        component: NewAccommodationComponent,
    },
];

@NgModule({
    declarations: [
        PersonalInfoFormComponent,
        AccommodationFormComponent,
        PointsFormComponent,
        FinishFormComponent,
        ShowComponent,
        NewAccommodationComponent,
    ],
    imports: [CommonModule, MaterialModule, ReactiveFormsModule, SharedLibModule, RouterModule.forChild(routes)],
    exports: [
        PersonalInfoFormComponent,
        AccommodationFormComponent,
        PointsFormComponent,
        FinishFormComponent,
        RouterModule,
    ],
})
export class NewAccommodationModule {}
