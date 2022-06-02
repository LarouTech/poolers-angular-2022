import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, lastValueFrom, map, Observable, tap } from 'rxjs';
import { SpinnerType } from '../shared/components/load-awesome-spinner/load-awesome-spinner.enums';
import { LoadingModalComponent } from '../shared/components/loading-modal/loading-modal.component';
import {
  AlignItemsTypes,
  JustifyContentType,
} from '../shared/components/primary-layout/primary-layout.component';
import { AuthService } from './auth-card/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  alignItems = AlignItemsTypes.CENTER;
  justifyContent = JustifyContentType.CENTER;
  authLoading$!: Observable<boolean>;

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.reloadAfterNetworkFailure();
    this.authLoading$ = this.authService.authLoading$.pipe(
      tap((res) => {
        console.log(res);
      })
    );

    // lastValueFrom(this.authService.stopLoadingSpinnerFromRouter(this.router));
  }

  reloadAfterNetworkFailure() {
    lastValueFrom(
      this.route.queryParams.pipe(
        tap((param) => {
          if (param['reload']) {
            this.document.location.reload();
          }
        })
      )
    );
  }
}
