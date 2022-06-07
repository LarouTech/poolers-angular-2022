import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { ScheduleExpands } from '../nhl/enum/scheduleExpands';
import { NhlSheduleService } from '../nhl/nhl-shedule.service';
import { SeasonsService } from '../nhl/seasons.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleLayoutResolver implements Resolve<any> {
  today!: string;

  constructor(
    private seasons: SeasonsService,
    private nhlSchedule: NhlSheduleService
  ) {
    this.today = this.nhlSchedule.dateFormatter(new Date());
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.seasons.getSeason().pipe(
      switchMap((res) => {
        const numberOfSeasons = res.length;
        const currentSeason = res[numberOfSeasons - 1];

        return this.nhlSchedule
          .getSchedule(
            ScheduleExpands.LINESCORE,
            this.today,
            currentSeason.seasonEndDate
          )
          .pipe(
            map((games) => {
              return games.length * 260;
            })
          );
      })
    );
  }
}
