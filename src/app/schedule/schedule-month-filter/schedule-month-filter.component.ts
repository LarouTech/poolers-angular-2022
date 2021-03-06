import { Component, OnInit } from '@angular/core';
import {
  Observable,
  switchMap,
  map,
  of,
  lastValueFrom,
  Subject,
  tap,
  BehaviorSubject,
  take,
} from 'rxjs';
import { SeasonsService } from 'src/app/nhl/seasons.service';
import { MonthFilterState, ScheduleService } from '../schedule.service';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Component({
  selector: 'schedule-month-filter',
  templateUrl: './schedule-month-filter.component.html',
  styleUrls: ['./schedule-month-filter.component.scss'],
})
export class ScheduleMonthFilterComponent implements OnInit {
  seasonMonths$!: Observable<string[]>;
  monthFilterState$!: Observable<MonthFilterState[]>;

  constructor(
    private scheduleService: ScheduleService,
    private seasons: SeasonsService
  ) {}

  ngOnInit(): void {
    this.seasonMonths$ = this.getMonthsNameFromDateRange();
    lastValueFrom(this.intiFilterState());
    this.monthFilterState$ = this.scheduleService.monthFilterilterState$;
  }

  private intiFilterState() {
    return this.seasonMonths$.pipe(
      tap((months) => {
        const filterState: MonthFilterState[] = [];

        for (let i = 0; i < months.length; i++) {
          filterState.push({ index: i, state: false, name: months[i] });
        }

        filterState[0].state = true;

        this.scheduleService.setMonFilterilterState(filterState);
      })
    );
  }

  onFilterByMonth(month: string, index: number) {
    const monthNumber = MONTHS.indexOf(month) + 1;

    const filterByMonth$ = this.scheduleService.seasonWeekRanges$.pipe(
      switchMap((ranges) => {
        return this.scheduleService.monthFilterilterState$.pipe(
          take(1),
          map((filter) => {
            filter.forEach((f) => {
              f.index === index ? (f.state = true) : (f.state = false);
            });

            let flag = false;

            ranges.map((range) => {
              const month = range.startDate.getMonth() + 1;

              if (range.startDate.getMonth() + 1 === monthNumber) {
                if (!flag) {
                  flag = true;

                  const newIndex = ranges.indexOf(range);

                  this.scheduleService.setMonFilterilterState(filter);

                  this.scheduleService.setRangeIndex(newIndex);
                  this.scheduleService.setSelectedWeekRanges(range);
                }

                return;
              }
            });
          })
        );
      })
    );

    lastValueFrom(filterByMonth$);
  }

  private getMonthsNameFromDateRange() {
    return this.scheduleService.selectedSeason$.pipe(
      switchMap((season) => {
        if (season) {
          return this.seasons.getSeasonById(season.value).pipe(
            map((selectedSeason) => {
              const startDate = selectedSeason.regularSeasonStartDate;
              const endDate = selectedSeason.regularSeasonEndDate;
              const date = [];

              const startMonth = +startDate.split('-')[1];
              const endMonth = +endDate.split('-')[1];

              const startYear = +startDate.split('-')[0];
              const endYear = +endDate.split('-')[0];

              if (startYear === endYear) {
                for (let i = startMonth; i <= endMonth; i++) {
                  const months = MONTHS[i - 1];
                  date.push(months);
                }

                return date;
              } else {
                for (let j = startMonth; j <= 12; j++) {
                  const months = MONTHS[j - 1];
                  date.push(months);
                }

                for (let k = 1; k <= endMonth; k++) {
                  const months = MONTHS[k - 1];
                  date.push(months);
                }
                return date;
              }
            })
          );
        }

        return of();
      })
    );
  }
}
