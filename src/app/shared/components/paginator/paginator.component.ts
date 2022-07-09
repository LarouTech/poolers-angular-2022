import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Observable,
  map,
  lastValueFrom,
  switchMap,
  take,
  BehaviorSubject,
} from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { LayoutService } from 'src/app/services/layout.service';
import { PaginatorService } from './paginator.service';

export interface Paginator {
  data: Player[][];
  numberOfItems: number;
  pages: number;
  paginatorIndex: number;
  lastChunkIndexes: number;
}

export enum PaginatorSide {
  'BACKWARD' = 'backward',
  'FORWARD' = 'forward',
}

export interface PaginatorFilter {
  value: number | string;
  selected: boolean;
}

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input('data') data$!: Observable<any[]>;
  @Input('paginatorFilter') paginatorFilter?: PaginatorFilter[];
  @Input('scrollOnSelectFilter') scrollOnSelectFilter?: boolean = false;
  paginator$!: Observable<Paginator>;
  paginateBackward = PaginatorSide.BACKWARD;
  paginateForward = PaginatorSide.FORWARD;
  private _filteringValue = new BehaviorSubject<number>(0);

  private _itemValue = new BehaviorSubject<number>(0);

  get itemValue$() {
    return this._itemValue.asObservable();
  }

  get filteringValue$(): Observable<number> {
    return this._filteringValue.asObservable();
  }

  constructor(
    private layoutService: LayoutService,
    private paginatorService: PaginatorService
  ) {}

  ngOnInit(): void {
    this.initPaginatorFilter();
    this.paginator$ = this.paginatorService.paginator$;
    this.paginateData(
      this._filteringValue ? this._filteringValue.getValue() : 100
    );
    this.setItemValue();
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

    const filterObj = this.paginatorFilter?.find(
      (filter) => filter.value === +value
    );

    const index = this.paginatorFilter!.indexOf(filterObj!);

    this._filteringValue.next(value);
    this.paginateData(value);

    this.paginator$ = this.paginator$.pipe(
      take(1),
      map((paginator) => {
        paginator.paginatorIndex = 0;
        return paginator;
      })
    );

    this._itemValue.next(value);
    this.scrollOnSelectFilter ? this.layoutService.scrollToTop() : null;
  }

  private initPaginatorFilter() {
    const filter = this.paginatorFilter
      ? this.paginatorFilter
      : [
          { value: 25, selected: true },
          { value: 50, selected: false },
          { value: 100, selected: false },
        ];

    this._filteringValue.next(
      filter.find((filter) => filter.selected === true)?.value as number
    );
  }

  private setItemValue(): void {
    const itemValue$ = this.paginator$.pipe(
      switchMap((paginator) => {
        return this.filteringValue$.pipe(
          map((filterValue) => {
            for (let i = 0; i <= paginator.pages; i++) {
              let value = filterValue * (paginator.paginatorIndex + 1);

              if (paginator.paginatorIndex + 1 === paginator.pages) {
                value =
                  (paginator.pages - 1) * filterValue +
                  paginator.lastChunkIndexes;
              }

              this._itemValue.next(value);
            }
          })
        );
      })
    );

    lastValueFrom(itemValue$);
  }

  private paginateData(paginateValue: number) {
    const data$ = this.data$.pipe(
      switchMap((data) => {
        return this.paginatorService.paginator$.pipe(
          take(1),
          map((paginator) => {
            const numberOfItems = data.length;
            const pages = Math.ceil(numberOfItems / paginateValue);

            const cloneDataObj = data.map((x) => {
              x.dataIndex = data.indexOf(x);
              return x;
            });

            let paginatorData = [];
            for (let i = pages; i > 0; i--) {
              paginatorData.push(
                cloneDataObj.splice(0, Math.ceil(paginateValue))
              );
            }

            const paginatorObj: Paginator = {
              data: paginatorData,
              numberOfItems: numberOfItems,
              pages: pages,
              paginatorIndex: paginator ? paginator.paginatorIndex : 0,
              lastChunkIndexes:
                paginatorData.length <= 0
                  ? 0
                  : paginatorData[paginatorData.length - 1].length,
            };

            this.paginatorService.setPaginator(paginatorObj);
            return paginator;
          })
        );
      })
    );

    lastValueFrom(data$);
  }
}
