import {
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  Observable,
  map,
  take,
  BehaviorSubject,
  switchMap,
  of,
  tap,
  distinctUntilChanged,
} from 'rxjs';
import { Router } from '@angular/router';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { PlayersService } from 'src/app/nhl/players.service';
import { ScheduleService } from 'src/app/schedule/schedule.service';
import { LayoutService } from 'src/app/services/layout.service';
import {
  SpinnerColor,
  SpinnerSize,
  SpinnerType,
} from 'src/app/shared/components/load-awesome-spinner/load-awesome-spinner.enums';

interface RenderedValue {
  name: string;
  value: number | string;
  imgUrl?: string;
  teamName?: string;
  jerseyNumber?: number;
  currentPosition?: string;
  teamId: number;
  playerId: number;
}

@Component({
  selector: 'stats-card-item',
  templateUrl: './stats-card-item.component.html',
  styleUrls: ['./stats-card-item.component.scss'],
})
export class StatsCardItemComponent implements OnInit {
  @Input('sortBy') sortBy!: string;
  @Input('descending') decending!: boolean;
  @Input('filterName') filterName!: string;
  @Input('players') players$!: Observable<Player[]>;

  isLoading$: Observable<boolean> = of(false);
  spinnerType = SpinnerType['ball-spin-clockwise'];
  spinnerSize = SpinnerSize['3x'];
  spinnerColor = '#1c1f78';

  innerWidth$!: Observable<number>;

  _hoverIndex = new BehaviorSubject<number>(0);
  _selectedIndex = new BehaviorSubject<number>(0);

  get selectedIndex$(): Observable<number> {
    return this._selectedIndex.asObservable();
  }

  get hoverIndex$(): Observable<number> {
    return this._hoverIndex.asObservable();
  }

  renderingValue$!: Observable<RenderedValue[]>;

  constructor(
    private playerService: PlayersService,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.renderingValue$ = this.playersSorter();
    this.innerWidth$ = this.layoutService.innerWidth$;
    this.isLoading$ = this.playerService.playerLoading$;
  }

  ngAfterViewInit(): void {
    this.renderingValue$ = this.playersSorter();
  }

  ngAfterContentChecked(): void {
    this.renderingValue$ = this.playersSorter();
  }

  onSelectPlayer(index: number) {
    this._selectedIndex.next(index);
  }

  private playersSorter() {
    return this.players$.pipe(
      take(1),
      map((players: any[]) => {
        players = players.sort((a: any, b: any) => {
          let sorterA = a;
          let sorterB = b;

          if (this.decending === false) {
            sorterA = b;
            sorterB = a;
          }

          if (!sorterA.stats![0].splits[0] || !sorterB.stats![0].splits[0]) {
            return 0;
          } else {
            return (
              +sorterB.stats![0].splits[0].stat[this.sortBy]! -
              +sorterA.stats![0].splits[0].stat[this.sortBy]!
            );
          }
        });

        return players
          .map((player) => {
            return {
              name: player.fullName,
              value: player.stats![0].splits[0]
                ? player.stats![0].splits[0].stat[this.sortBy]
                : 0,
              imgUrl: player.image.headshot,
              teamName: player.team ? player.team.name : 'n/a',
              jerseyNumber: player.primaryNumber ? player.primaryNumber : 'n/a',
              currentPosition: player.primaryPosition.code
                ? player.primaryPosition.code
                : 'n/a',
              teamId: player.currentTeam ? player.currentTeam.id : 0,
              playerId: player.id,
            } as RenderedValue;
          })
          .splice(0, 10);
      })
    );
  }
}
