import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { FranchisesService } from 'src/app/nhl/franchises.service';
import { FranchiseAllTime } from 'src/app/nhl/interfaces/franchiseAllTime.interface';
import { ScheduledGame } from 'src/app/nhl/interfaces/schedule.interface';

@Component({
  selector: 'schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss'],
})
export class ScheduleItemComponent implements OnInit {
  @Input('scheduledGame') scheduledGame!: ScheduledGame;
  @ViewChild('gameContainer') gameContainer!: ElementRef;
  teamsLogos$!: Observable<FranchiseAllTime[]>;
  game$!: Observable<ScheduledGame>;

  constructor(
    private franchises: FranchisesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.teamsLogos$ = this.franchises.getLogosFromRouteResolver(this.route);
    this.game$ = this.getGameData();
  }

  getGameData(): Observable<ScheduledGame> {
    return this.teamsLogos$.pipe(
      this.franchises.logoFromSchduledGameRxjsPipe(this.scheduledGame)
    );
  }
}
