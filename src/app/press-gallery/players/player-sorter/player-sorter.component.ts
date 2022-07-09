import { Component, Input, OnInit } from '@angular/core';
import {
  Observable,
  map,
  take,
  lastValueFrom,
  pipe,
  switchMap,
  tap,
  BehaviorSubject,
  of,
} from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { PlayersService } from 'src/app/nhl/players.service';

export enum SortType {
  'TEAM' = 'team',
  'AGE' = 'age',
  'HEIGHT' = 'height',
  'WEIGHT' = 'weight',
  'NAME' = 'name',
  'NATIONALITY' = 'nationality',
  'POSITION' = 'position',
  'HAND' = 'hand',
}

enum SorterControllerAttr {
  'TEAM' = 'currentTeam.name',
  'WEIGHT' = 'weight',
  'HEIGHT' = 'height',
  'AGE' = 'currentAge',
  'NAME' = 'fullName',
  'NATIONALITY' = 'nationality',
  'POSITION' = 'primaryPosition.code',
  'HAND' = 'shootsCatches',
}

enum SortAttrType {
  'STRING' = 'string',
  'INTEGER' = 'integer',
  'BOOLEAN' = 'boolean',
}

@Component({
  selector: 'player-sorter',
  templateUrl: './player-sorter.component.html',
  styleUrls: ['./player-sorter.component.scss'],
})
export class PlayerSorterComponent implements OnInit {
  @Input('sortType') sortType!: SortType;
  private _isAscending = new BehaviorSubject<boolean>(true);

  get isAscending$(): Observable<boolean> {
    return this._isAscending.asObservable();
  }

  constructor(private playerService: PlayersService) {}

  ngOnInit(): void {}

  private sortPlayersStringAttr(
    array: Player[],
    attr: string,
    ascending: boolean
  ): Observable<Player[]> {
    return this.playerService.players$.pipe(
      take(1),
      map((players) => {
        const test = array.find((player) => player.id === 8478400);
        console.log(test);

        const sorted = array.sort((a: any, b: any) => {
          const attrTransformer = attr.split('.');

          let sorterA = ascending ? a : b;
          let sorterB = ascending ? b : a;

          for (let i = 0; i < attrTransformer.length; i++) {
            sorterA = sorterA[attrTransformer[i]]
              ? sorterA[attrTransformer[i]]
              : 'UNKNOW';
            sorterB = sorterB[attrTransformer[i]]
              ? sorterB[attrTransformer[i]]
              : 'UNKNOW';
          }

          return sorterA.localeCompare(sorterB, undefined, {
            numeric: true,
            sensitivity: 'base',
          });
        });

        return sorted;
      })
    );
  }

  private sortPlayerIntegerAttr(
    array: Player[],
    attr: string,
    ascending: boolean
  ): Observable<Player[]> {
    return this.playerService.players$.pipe(
      take(1),
      map((players) => {
        const sorted = players.sort((a: any, b: any) => {
          const attrTransformer = attr.split('.');

          let sorterA = ascending ? a : b;
          let sorterB = ascending ? b : a;

          for (let i = 0; i < attrTransformer.length; i++) {
            sorterA = sorterA[attrTransformer[i]];
            sorterB = sorterB[attrTransformer[i]];
          }

          return sorterA - sorterB;
        });

        return sorted;
      })
    );
  }

  private sorterController(attr: string, resType: string): void {
    const sortbyTeam$ = this.playerService.players$.pipe(
      take(1),
      switchMap((players) => {
        return this.isAscending$.pipe(
          take(1),
          switchMap((isAscending) => {
            if (resType === SortAttrType.INTEGER) {
              return this.sortPlayerIntegerAttr(
                players,
                attr,
                isAscending
              ).pipe(
                tap((sortedPlayers) => {
                  this._isAscending.next(!isAscending);
                  this.playerService.setPlayers(sortedPlayers);
                })
              );
            }

            if (resType === SortAttrType.STRING) {
              return this.sortPlayersStringAttr(
                players,
                attr,
                isAscending
              ).pipe(
                tap((sortedPlayers) => {
                  this._isAscending.next(!isAscending);
                  this.playerService.setPlayers(sortedPlayers);
                })
              );
            }

            return of();
          })
        );
      })
    );

    lastValueFrom(sortbyTeam$);
  }

  onSort(): void {
    switch (this.sortType) {
      case SortType.TEAM:
        this.sorterController(SorterControllerAttr.TEAM, SortAttrType.STRING);

        break;

      case SortType.HEIGHT:
        this.sorterController(SorterControllerAttr.HEIGHT, SortAttrType.STRING);

        break;
      case SortType.WEIGHT:
        this.sorterController(
          SorterControllerAttr.WEIGHT,
          SortAttrType.INTEGER
        );

        break;

      case SortType.AGE:
        this.sorterController(SorterControllerAttr.AGE, SortAttrType.INTEGER);

        break;
      case SortType.NAME:
        this.sorterController(SorterControllerAttr.NAME, SortAttrType.STRING);

        break;

      case SortType.NATIONALITY:
        this.sorterController(
          SorterControllerAttr.NATIONALITY,
          SortAttrType.STRING
        );

        break;

      case SortType.POSITION:
        this.sorterController(
          SorterControllerAttr.POSITION,
          SortAttrType.STRING
        );

        break;

      case SortType.HAND:
        this.sorterController(SorterControllerAttr.HAND, SortAttrType.STRING);

        break;

      default:
        break;
    }
  }
}
