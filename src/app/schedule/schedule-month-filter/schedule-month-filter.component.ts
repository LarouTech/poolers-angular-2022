import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, map, of } from 'rxjs';
import { SeasonsService } from 'src/app/nhl/seasons.service';
import { ScheduleService } from '../schedule.service';

const MONTHS = [
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

  constructor(
    private scheduleService: ScheduleService,
    private seasons: SeasonsService
  ) {}

  ngOnInit(): void {
    this.seasonMonths$ = this.getMonthsNameFromDateRange();
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
