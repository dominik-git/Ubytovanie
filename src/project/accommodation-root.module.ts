import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationRootComponent } from './accommodation-root.component';
import { SharedLibModule } from './modules/shared-lib/shared-lib.module';
import { MaterialModule } from './modules/material/material.module';
import { AccommodationRootRoutingModule } from './accommodation-root-routing.module';
import { NewAccommodationModule } from './modules/new-accommodation/new-accommodation.module';
import { UserService } from '../app/service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AisResourceService } from './service/ais-resource.service';
import { UserRequestService } from './service/user-request.service';

@NgModule({
    declarations: [AccommodationRootComponent],
    imports: [
        CommonModule,
        MaterialModule,
        SharedLibModule,
        AccommodationRootRoutingModule,
        NewAccommodationModule,
        HttpClientModule,
    ],
    exports: [],
    providers: [
        AisResourceService,
        UserRequestService
    ],
})
export class AccommodationRootModule {}
