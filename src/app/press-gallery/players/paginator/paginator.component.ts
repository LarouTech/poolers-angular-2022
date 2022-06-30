import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, map, lastValueFrom, switchMap, take } from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { PaginatorService } from './paginator.service';

export interface Paginator {
  data: Player[][];
  numberOfItems: number;
  pages: number;
  paginatorIndex: number;
}

export enum PaginatorSide {
  'BACKWARD' = 'backward',
  'FORWARD' = 'forward',
}

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input('players') players$!: Observable<Player[]>;
  paginator$!: Observable<Paginator>;
  paginateBackward = PaginatorSide.BACKWARD;
  paginateForward = PaginatorSide.FORWARD;

  constructor(private paginatorService: PaginatorService) {}

  ngOnInit(): void {
    this.paginator$ = this.paginatorService.paginator$;
    lastValueFrom(this.paginatePlayers(100));
  }

  onPaginateHandler(side: PaginatorSide): void {
    const newPaginator$ = this.paginatorService.paginator$.pipe(
      take(1),
      map((paginator) => {
        if (
          paginator.paginatorIndex <= paginator.pages &&
          side === PaginatorSide.FORWARD
        ) {
          if (paginator.paginatorIndex === paginator.pages - 1) {
            return;
          }
          paginator.paginatorIndex = paginator.paginatorIndex + 1;
        }

        if (
          paginator.paginatorIndex <= paginator.pages &&
          side === PaginatorSide.BACKWARD
        ) {
          if (paginator.paginatorIndex === 0) {
            return;
          }

          paginator.paginatorIndex = paginator.paginatorIndex - 1;
        }

        this.paginatorService.setPaginator(paginator);

        return paginator;
      })
    );

    lastValueFrom(newPaginator$);
  }

  onSelectPaginatorValue(event: any): void {
    const value = event.target.value;
    lastValueFrom(this.paginatePlayers(value));
  }

  paginatePlayers(paginateValue: number): Observable<Paginator> {
    return this.players$.pipe(
      switchMap((players) => {
        return this.paginatorService.paginator$.pipe(
          take(1),
          map((paginator) => {
            const numberOfPlayers = players.length;
            const pages = Math.ceil(numberOfPlayers / paginateValue);

            const newObj = players.map((x) => {
              x.dataIndex = players.indexOf(x);
              return x;
            });

            let paginatorData = [];
            for (let i = pages; i > 0; i--) {
              paginatorData.push(newObj.splice(0, Math.ceil(paginateValue)));
            }

            const paginatorObj: Paginator = {
              data: paginatorData,
              numberOfItems: numberOfPlayers,
              pages: pages,
              paginatorIndex: paginator ? paginator.paginatorIndex : 0,
            };

            this.paginatorService.setPaginator(paginatorObj);
            return paginator;
          })
        );
      })
    );
  }
}
