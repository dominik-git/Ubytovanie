import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatStepperModule,
        MatInputModule,
        MatSidenavModule,
        MatListModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatStepperModule,
        MatCardModule,
        MatIconModule,
        MaterialFileInputModule,
        MatRadioModule,
        MatSidenavModule,
        MatListModule,
        MatProgressSpinnerModule,
    ],
})
export class MaterialModule {}
