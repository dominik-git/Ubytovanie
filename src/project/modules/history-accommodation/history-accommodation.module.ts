import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistoryAccommodationComponent } from './history-accommodation.component';
import { AccommodationHistoryDetailsComponent } from './components/accommodation-history-details/accommodation-history-details.component';
import { MaterialModule } from '../material/material.module';
import { SharedLibModule } from '../shared-lib/shared-lib.module';

const routes: Routes = [
  {
    path: '',
    component: HistoryAccommodationComponent,
  },
];

@NgModule({
  declarations: [HistoryAccommodationComponent, AccommodationHistoryDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedLibModule,
  ],
})
export class HistoryAccommodationModule { }
