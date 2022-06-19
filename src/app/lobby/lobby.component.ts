import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { Profile, ProfileService } from '../profile.service';
import { AuthService } from '../toolbar/auth/auth.service';

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {
    // this.authService.stopLoadingSpinnerFromRouter(this.router);
  }
}
