import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../home/auth-card/auth.service';
import { NhlSheduleService } from '../nhl/nhl-shedule.service';
import { PlayersService } from '../nhl/players.service';
import { ProfileService } from '../profile.service';
import {
  AlignItemsTypes,
  JustifyContentType,
} from '../shared/components/primary-layout/primary-layout.component';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  alignItems = AlignItemsTypes.FLEX_START;
  justifyContent = JustifyContentType.CENTER;
  authLoading$!: Observable<boolean>;

  constructor(
    private players: PlayersService,
    private nhlSchedule: NhlSheduleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authLoading$ = this.authService.authLoading$;

    this.nhlSchedule.getSchedule().subscribe((data) => console.log(data));
  }
}
