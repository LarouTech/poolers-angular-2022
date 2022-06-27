import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, tap, take, of, lastValueFrom } from 'rxjs';
import { ScheduleExpands } from 'src/app/nhl/enum/scheduleExpands';
import { NhlSheduleService } from 'src/app/nhl/nhl-shedule.service';
import { SeasonsService, SeasonWeekRange } from 'src/app/nhl/seasons.service';
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
    private seasons: SeasonsService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    lastValueFrom(this.setWeekRanges());
    this.seasonWeekRanges$ = this.setWeekRanges();
    this.selectedWeekRange$ = this.scheduleService.selectedWeekRange$;
  }

  private setWeekRanges() {
    return this.scheduleService.selectedSeason$.pipe(
      switchMap((selectedSeason) => {
        if (selectedSeason) {
          return this.getWeekRanges(selectedSeason.value).pipe(
            tap((range) => {
              this.scheduleService.setSelectedWeekRanges(range[0]);
            })
          );
        }
        return of([{ startDate: new Date(), endDate: new Date() }]);
      })
    );
  }

  private getWeekRanges(seasonId: number): Observable<SeasonWeekRange[]> {
    return this.seasons
      .getSeasonById(seasonId)
      .pipe(this.seasons.seasonRangePipe());
  }

  onChangeScheduleWeekRange(side: WeekRangeSide) {
    const changeRange$ = this.seasonWeekRanges$.pipe(
      take(1),
      switchMap((ranges) => {
        return this.scheduleService.selectedSeason$.pipe(
          take(1),
          switchMap((season) => {
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
                      ScheduleExpands.LINESCORE,
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
                      ScheduleExpands.LINESCORE,
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

    lastValueFrom(changeRange$);
  }
}
