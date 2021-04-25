import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationRootComponent } from './accommodation-root.component';
import { ShowComponent } from './modules/new-accommodation/components/show/show.component';
import { HistoryAccommodationComponent } from './modules/history-accommodation/history-accommodation.component';

const routes: Routes = [
    {
        path: '',
        component: AccommodationRootComponent,
        pathMatch: '',
        children: [
            {
                path: 'new-accommodation/:id/:akRok',
                loadChildren: () =>
                    import('./modules/new-accommodation/new-accommodation.module').then(
                        (mod) => mod.NewAccommodationModule,
                    ),
                data: { preloading: false },
            },
            {
                path: 'history/:id',
                loadChildren: () =>
                    import('./modules/history-accommodation/history-accommodation.module').then(
                        (mod) => mod.HistoryAccommodationModule,
                    ),
                data: { preloading: false },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccommodationRootRoutingModule {}
