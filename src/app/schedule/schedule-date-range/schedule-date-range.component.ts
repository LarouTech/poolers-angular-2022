import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, tap, take, of, lastValueFrom } from 'rxjs';
import { ScheduleExpands } from 'src/app/nhl/enum/scheduleExpands';
import { NhlSheduleService } from 'src/app/nhl/nhl-shedule.service';
import { SeasonsService, SeasonWeekRange } from 'src/app/nhl/seasons.service';
import { MONTHS } from '../schedule-month-filter/schedule-month-filter.component';
import { ScheduleService } from '../schedule.service';

enum WeekRangeSide {
  'RIGHT' = 'right',
  'LEFT' = 'left',
}
@Component({
  selector: 'schedule-date-range',
  templateUrl: './schedule-date-range.component.html',
  styleUrls: ['./schedule-date-range.component.scss'],
})
export class ScheduleDateRangeComponent implements OnInit {
  seasonWeekRanges$!: Observable<SeasonWeekRange[]>;
  selectedWeekRange$!: Observable<SeasonWeekRange>;
  rightSide = WeekRangeSide.RIGHT;
  leftSide = WeekRangeSide.LEFT;

  constructor(
    private nhlSchedule: NhlSheduleService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.seasonWeekRanges$ = this.scheduleService.seasonWeekRanges$;
    this.selectedWeekRange$ = this.scheduleService.selectedWeekRange$;
  }

  onChangeScheduleWeekRange(side: WeekRangeSide) {
    const changeRange$ = this.seasonWeekRanges$.pipe(
      take(1),
      switchMap((ranges) => {
        return this.scheduleService.selectedSeason$.pipe(
          take(1),
          switchMap((season) => {
            return this.scheduleService.monthFilterilterState$.pipe(
              take(1),
              switchMap((filterState) => {
                if (side === WeekRangeSide.RIGHT) {
                  return this.scheduleService.rangeIndex$.pipe(
                    take(1),
                    switchMap((i) => {
                      if (i === ranges.length - 1) {
                        this.scheduleService.setRangeIndex(0);
                        this.scheduleService.setSelectedWeekRanges({
                          startDate: ranges[0].startDate,
                          endDate: ranges[0].endDate,
                        });
                        return of([]);
                      }

                      const nextMonthLeft = ranges[i + 1].startDate.getMonth();
                      const nextMonth = MONTHS[nextMonthLeft];

                      filterState = filterState.map((f) => {
                        f.state = false;
                        if (f.name === nextMonth) {
                          f.state = true;
                        }
                        return f;
                      });

                      this.scheduleService.setMonFilterilterState(filterState);

                      this.scheduleService.setRangeIndex(i + 1);
                      this.scheduleService.setSelectedWeekRanges({
                        startDate: ranges[i + 1].startDate,
                        endDate: ranges[i + 1].endDate,
                      });

                      const startStr = this.scheduleService.dateSanitizer(
                        ranges[i + 1].startDate
                      );
                      const endStr = this.scheduleService.dateSanitizer(
                        ranges[i + 1].endDate
                      );

                      return this.nhlSchedule
                        .getSchedule(
                          ScheduleExpands.DECISIONS,
                          season.value,
                          startStr,
                          endStr
                        )
                        .pipe(
                          take(1),
                          tap((schedules) => {
                            this.scheduleService.setScheduledGames(schedules);
                          })
                        );
                    })
                  );
                }

                if (side === WeekRangeSide.LEFT) {
                  return this.scheduleService.rangeIndex$.pipe(
                    take(1),
                    switchMap((i) => {
                      if (i === 0) {
                        this.scheduleService.setRangeIndex(ranges.length - 1);
                        this.scheduleService.setSelectedWeekRanges({
                          startDate: ranges[ranges.length - 1].startDate,
                          endDate: ranges[ranges.length - 1].endDate,
                        });
                        return of([]);
                      }

                      const nextMonthRight = ranges[i - 1].startDate.getMonth();
                      const previousMonth = MONTHS[nextMonthRight];

                      filterState = filterState.map((f) => {
                        f.state = false;
                        if (f.name === previousMonth) {
                          f.state = true;
                        }
                        return f;
                      });

                      this.scheduleService.setMonFilterilterState(filterState);

                      this.scheduleService.setRangeIndex(i - 1);
                      this.scheduleService.setSelectedWeekRanges({
                        startDate: ranges[i - 1].startDate,
                        endDate: ranges[i - 1].endDate,
                      });

                      const startStr = this.scheduleService.dateSanitizer(
                        ranges[i - 1].startDate
                      );
                      const endStr = this.scheduleService.dateSanitizer(
                        ranges[i - 1].endDate
                      );

                      return this.nhlSchedule
                        .getSchedule(
                          ScheduleExpands.DECISIONS,
                          season.value,
                          startStr,
                          endStr
                        )
                        .pipe(
                          take(1),
                          tap((schedules) => {
                            this.scheduleService.setScheduledGames(schedules);
                          })
                        );
                    })
                  );
                }

                return of();
              })
            );
          })
        );
      })
    );

    lastValueFrom(changeRange$);
  }
}
