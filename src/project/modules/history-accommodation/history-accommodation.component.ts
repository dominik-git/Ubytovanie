import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AisResourceService } from '../../service/ais-resource.service';
import { UserRequestService } from '../../service/user-request.service';
import { AuthService } from 'ais-login-lib';

@Component({
    selector: 'app-history-accommodation',
    templateUrl: './history-accommodation.component.html',
    styleUrls: ['./history-accommodation.component.scss'],
})
export class HistoryAccommodationComponent implements OnInit {
    @Output('currentRequest') currentRequest;
    accomodationRequest;
    isLoading: any;
    constructor(
        private router: Router,
        private aisResourceService: AisResourceService,
        private route: ActivatedRoute,
        private userRequestService: UserRequestService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        const requestId = Number(this.route.snapshot.paramMap.get('id'));
        this.aisResourceService.getAccommodationRequestById(requestId).subscribe(
            (res) => {
                // @ts-ignore
                this.accomodationRequest = res;
                // @ts-ignore
                const userRequestName = `${res.osoba.plneMeno}, ${res.studium.studijnyProgram.skratka}, ${res.akRok} `;
                this.userRequestService.setUserRequestName(userRequestName);
                this.isLoading = false;
            },
            (err) => {
                if (err.status === 401 || err.status === 403) {
                  console.log(err)
                    this.authService.logout();
                    this.router.navigateByUrl(`/login`);
                }
            },
        );
    }
}
