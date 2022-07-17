import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  Observable,
  switchMap,
  tap,
  of,
  map,
  BehaviorSubject,
  lastValueFrom,
} from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { PlayersService } from 'src/app/nhl/players.service';
import { SeasonsService } from 'src/app/nhl/seasons.service';
import { ScheduleService } from 'src/app/schedule/schedule.service';
import { LayoutService } from 'src/app/services/layout.service';
import { StatsType } from '../stats-card/stats-card.component';

@Component({
  selector: 'stats-home',
  templateUrl: './stats-home.component.html',
  styleUrls: ['./stats-home.component.scss'],
})
export class StatsHomeComponent implements OnInit {
  skaters$!: Observable<Player[]>;
  innerWidth$!: Observable<number>;
  players$!: Observable<Player[]>;

  goaliesNavigatorItems = ['gaa', 'sv%', 'shuouts'];
  playerNavigatorItems = ['points', 'goals', 'assists'];
  skatersStatsType = StatsType.SKATERS;
  goalieStatsType = StatsType.GOALIES;
  defensemenStatsType = StatsType.DEFENSEMEN;
  rookieStatsType = StatsType.ROOKIE;

  private _intialComponentLoaded = new BehaviorSubject<boolean>(false);

  constructor(
    private seasonsService: SeasonsService,
    private scheduleService: ScheduleService,
    private layoutService: LayoutService,
    private playerService: PlayersService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.innerWidth$ = this.layoutService.innerWidth$;
    this.fetchPlayerOnChangeSeasonDetection();
  }

  private fetchPlayerOnChangeSeasonDetection(): void {
    const newPlayersSet$ = this.scheduleService.selectedSeason$.pipe(
      switchMap((season) => {
        return this.seasonsService.getCurrentSeason().pipe(
          switchMap((currentSeason) => {
            if (
              season.value === +currentSeason.seasonId &&
              this._intialComponentLoaded.getValue() === true
            ) {
              return this.playerService.getPlayers(season.value);
            }

            if (season && season.value != +currentSeason.seasonId) {
              this._intialComponentLoaded.next(true);
              return this.playerService.getPlayers(season.value);
            } else {
              return this.playerService.players$;
            }
          })
        );
      })
    );
    lastValueFrom(newPlayersSet$);
  }
}
