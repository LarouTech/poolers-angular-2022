import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthService } from '../home/auth-card/auth.service';
import { LayoutService } from '../layout.service';
import { FranchisesService } from '../nhl/franchises.service';
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
  @ViewChild('containerEl') containerEl!: ElementRef;

  constructor(
    private franchise: FranchisesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authLoading$ = this.authService.authLoading$;
    // this.nhlSchedule.getSchedule().subscribe((data) => console.log(data));
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
}
