import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthService } from '../home/auth-card/auth.service';
import { Profile, ProfileService } from '../profile.service';
import {
  AlignItemsTypes,
  JustifyContentType,
} from '../shared/components/primary-layout/primary-layout.component';

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  alignItems = AlignItemsTypes.FLEX_START;
  justifyContent = JustifyContentType.CENTER;
  authLoading$!: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {
    this.authLoading$ = this.authService.authLoading$;
    // this.authService.stopLoadingSpinnerFromRouter(this.router);
  }
}
