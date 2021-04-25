import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachementComponent } from './components/attachement/attachement.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FileInputValueAccessorDirective } from './directive/file-input-value-accessor.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AttachmentPresentComponent } from './components/attachement-present/attachment-present.component';

@NgModule({
    declarations: [
        AttachementComponent,
        FileUploaderComponent,
        FileInputValueAccessorDirective,
        SpinnerComponent,
        AttachmentPresentComponent,
    ],
    imports: [CommonModule, MaterialModule, ReactiveFormsModule],
    exports: [AttachementComponent, FileUploaderComponent, SpinnerComponent, AttachmentPresentComponent],
})
export class SharedLibModule {}
