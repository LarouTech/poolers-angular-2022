import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/home/auth-card/auth.service';

import {
  AlignItemsTypes,
  JustifyContentType,
} from 'src/app/shared/components/primary-layout/primary-layout.component';

@Component({
  selector: 'game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
})
export class GameDetailsComponent implements OnInit {
  alignItems = AlignItemsTypes.CENTER;
  justifyContent = JustifyContentType.CENTER;
  authLoading$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authLoading$ = this.authService.authLoading$;
  }
}
