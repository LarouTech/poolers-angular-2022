import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, pipe, tap } from 'rxjs';
import { FranchisesService } from 'src/app/nhl/franchises.service';
import { FranchiseAllTime } from 'src/app/nhl/interfaces/franchiseAllTime.interface';
import { Game, Schedule } from 'src/app/nhl/interfaces/schedule.interface';

@Component({
  selector: 'schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss'],
})
export class ScheduleItemComponent implements OnInit {
  @Input('scheduledGame') scheduledGame!: Game;
  @ViewChild('gameContainer') gameContainer!: ElementRef;
  teamsLogos$!: Observable<FranchiseAllTime[]>;
  game$!: Observable<Game>;

  constructor(
    private franchises: FranchisesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.teamsLogos$ = this.franchises.getLogosFromRouteResolver(this.route);
    this.game$ = this.getGameData().pipe(tap((data) => console.log(data)));
  }

  getGameData(): Observable<Game> {
    return this.teamsLogos$.pipe(
      this.franchises.getLatestLogoRxjsPipe(this.scheduledGame)
    );
  }
}
