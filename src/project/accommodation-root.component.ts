import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AisResourceService } from './service/ais-resource.service';
import { UserRequestService } from './service/user-request.service';
import { Router } from '@angular/router';
import { AuthService } from 'ais-login-lib';
import { NavigationService } from './service/navigation.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'AccommodationRootComponent',
    templateUrl: './accommodation-root.component.html',
    styleUrls: ['./accommodation-root.component.scss'],
})
export class AccommodationRootComponent implements OnInit, OnDestroy {
    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private aisResourceService: AisResourceService,
        private userRequestService: UserRequestService,
        private authService: AuthService,
        private router: Router,
        private navigationService: NavigationService,
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.isSmallScreen = this.mobileQuery.matches;
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this.mobileQueryListener);
    }

    get getRequestLegendMap() {
        return Array.from(this.requestLegendMap.entries());
    }

    userRequestName: string;
    activeRequest: any[];
    historyRequests: any[];
    mobileQuery: MediaQueryList;
    isLoading: boolean;
    colorMap = new Map<number, string>();
    requestTitleMap = new Map<number, string>();
    requestLegendMap = new Map<number, string>();
    legendMapIterator;
    requestMap = new Map<number, any[]>();

    private readonly mobileQueryListener: () => void;
    private isSmallScreen: boolean;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth <= 600) {
            this.navigationService.changeState(true);
        } else if (event.target.innerWidth > 600) {
            this.navigationService.changeState(false);
        }
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.createColorMap();
        this.createRequestLegendMap();
        this.userRequestService.userRequestInfo$.subscribe((name) => {
            this.userRequestName = name;
        });
        this.aisResourceService.getAccommodationRequests().subscribe(
            (res) => {
                this.activeRequest = res.filter((request) => {
                    return request.stav.id !== 2;
                });

                this.historyRequests = res.filter((request) => {
                    return request.stav.id === 2;
                });

                const academicYear = this.activeRequest[0].akRok;
                const studyId = this.activeRequest[0].studium.id;
                this.isLoading = false;
                this.router.navigate(['accommodation/new-accommodation', studyId, academicYear]);
            },
            (err) => {
                if (err.status === 401 || err.status === 403) {
                    this.authService.logout();
                    this.router.navigateByUrl(`/login`);
                }
            },
        );
    }

    private createColorMap() {
        this.colorMap.set(0, 'green');
        this.colorMap.set(1, 'blue');
        this.colorMap.set(2, 'black');
        this.colorMap.set(3, 'yellow');
        this.colorMap.set(4, 'purple');
        this.colorMap.set(5, 'grey');
        this.colorMap.set(6, 'pink');
        this.colorMap.set(7, 'brown');
    }

    private createRequestLegendMap() {
        this.requestLegendMap.set(0, 'Žiadosť môžete upraviť');
        this.requestLegendMap.set(1, 'Žiadosť môžete pridať');
        this.requestLegendMap.set(2, 'Žiadosť len na čítanie');
        this.requestLegendMap.set(3, 'Žiadosť môžete obnoviť');
        this.requestLegendMap.set(4, 'Žiadosť môžete potvrdiť');
        this.requestLegendMap.set(5, 'V žiadosti môžete zrušiť obnovenie');
        this.requestLegendMap.set(6, 'V žiadosti môžete zrušiť potvrdenie');
        this.requestLegendMap.set(7, 'V žiadosti môžete evidovať odvolanie');
    }

    // private createRequestLegendMap() {
    //   this.requestLegendMap.set(0, 'Žiadosť môžete upraviť');
    //   this.requestLegendMap.set(1, 'Žiadosť môžete pridať');
    //   this.requestLegendMap.set(2, 'Žiadosť len na čítanie');
    //   this.requestLegendMap.set(3, 'Žiadosť môžete obnoviť');
    //   this.requestLegendMap.set(4, 'Žiadosť môžete potvrdiť');
    //   this.requestLegendMap.set(5, 'V žiadosti môžete zrušiť obnovenie');
    //   this.requestLegendMap.set(6, 'V žiadosti môžete zrušiť potvrdenie');
    //   this.requestLegendMap.set(7, 'Môžete evidovať odvolanie');
    // }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this.mobileQueryListener);
    }
}
