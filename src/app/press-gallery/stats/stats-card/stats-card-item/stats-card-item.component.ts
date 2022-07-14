import { Component, Input, OnInit } from '@angular/core';
import { Observable, map, take, BehaviorSubject } from 'rxjs';
import { FranchisesService } from 'src/app/nhl/franchises.service';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { LayoutService } from 'src/app/services/layout.service';

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
  @Input('players') players$!: Observable<Player[]>;
  @Input('sortBy') sortBy!: string;
  @Input('descending') decending!: boolean;
  @Input('filterName') filterName!: string;

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
    private layoutService: LayoutService,
    private franchiseService: FranchisesService
  ) {}

  ngOnInit(): void {
    this.renderingValue$ = this.playersSorter();
    this.innerWidth$ = this.layoutService.innerWidth$;
  }

  onHoverItem(event: Event, index: number) {
    this._hoverIndex.next(index);
  }

  onLeaveItem() {
    this._hoverIndex.next(this._selectedIndex.getValue());
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
              teamName: player.currentTeam ? player.currentTeam.name : 'N/A',
              jerseyNumber: player.primaryNumber,
              currentPosition: player.primaryPosition.code,
              teamId: player.currentTeam ? player.currentTeam.id : 0,
              playerId: player.id,
            } as RenderedValue;
          })
          .splice(0, 10);
      })
    );
  }
}
