import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  lastValueFrom,
  tap,
  take,
  switchMap,
  of,
  isEmpty,
} from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { PlayersService } from 'src/app/nhl/players.service';
import { SeasonsService } from 'src/app/nhl/seasons.service';
import { ScheduleService } from 'src/app/schedule/schedule.service';
import {
  DEFENSEMEN_INIT_STATE,
  GOALIE_INIT_STATE,
  NavigationState,
  ROOKIE_INIT_STATE,
  SKATER_INIT_STATE,
} from './stats-card-data';

export enum StatsType {
  'SKATERS' = 'skaters',
  'GOALIES' = 'goalies',
  'DEFENSEMEN' = 'defensemen',
  'ROOKIE' = 'rookie',
}

@Component({
  selector: 'stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
})
export class StatsCardComponent implements OnInit {
  @Input('title') title!: string;
  @Input('icon') icon!: string;
  @Input('navigatorMenuItems') navigatorMenuItems!: string[];
  @Input('statsType') statsType!: StatsType;
  @Input('players') players$!: Observable<Player[]>;

  private _navigationState = new BehaviorSubject<NavigationState[]>(null!);

  get navigationState$(): Observable<NavigationState[]> {
    return this._navigationState.asObservable();
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private playerService: PlayersService
  ) {}

  ngOnInit(): void {
    this.getPlayersData();
  }

  ngAfterContentChecked(): void {
    this.getPlayersData();
  }

  getPlayersData(): void {
    switch (this.statsType) {
      case StatsType.SKATERS:
        this.players$ = this.playerService.getSkaters();
        this._navigationState.next(SKATER_INIT_STATE);
        break;
      case StatsType.GOALIES:
        this.players$ = this.playerService.getGoalies();
        this._navigationState.next(GOALIE_INIT_STATE);
        break;
      case StatsType.DEFENSEMEN:
        this.players$ = this.playerService.getDefensemen();
        this._navigationState.next(DEFENSEMEN_INIT_STATE);
        break;
      case StatsType.ROOKIE:
        this.players$ = this.playerService.getRookieSkaters();
        this._navigationState.next(ROOKIE_INIT_STATE);
        break;
      default:
        break;
    }
  }

  onChangeTab(item: string): void {
    const updatedState$ = this.navigationState$.pipe(
      take(1),
      map((navigationState) => {
        const updatedState = navigationState.map((state) => {
          if (state.name === item) {
            state.state = true;
          } else {
            state.state = false;
          }
          return state;
        });

        return updatedState;
      }),
      tap((data) => this._navigationState.next(data))
    );

    lastValueFrom(updatedState$);
  }
}
