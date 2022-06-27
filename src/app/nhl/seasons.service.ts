import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Season } from './interfaces/seasons.interface';
import { map, pipe, of } from 'rxjs';
import { NhlSheduleService } from './nhl-shedule.service';

export interface SeasonWeekRange {
  startDate: Date;
  endDate: Date;
}
export interface SeasonLov {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class SeasonsService {
  private url = `${environment.nhlApi}/seasons`;
  private _currentSeason = new BehaviorSubject<Season>(null!);

  get currentSeason$(): Observable<Season> {
    return this._currentSeason.asObservable();
  }

  constructor(private schedule: NhlSheduleService, private http: HttpClient) {
    lastValueFrom(this.getSeason());
  }

  getSeason(): Observable<Season[]> {
    return this.http.get<Season[]>(this.url).pipe(
      tap((res) => {
        const numberOfSeasons = res.length;
        const currentSeason = res[numberOfSeasons - 1];
        this._currentSeason.next(currentSeason);
      })
    );
  }

  getSeasonById(id: number): Observable<Season> {
    return this.http.get<Season[]>(this.url).pipe(
      map((seasons) => {
        const season = seasons.find((s) => +s.seasonId === id);
        return season as Season;
      })
    );
  }

  getCurrentSeason() {
    return this.http.get<Season[]>(this.url).pipe(
      map((res) => {
        const numberOfSeasons = res.length;
        const currentSeason = res[numberOfSeasons - 1];

        return currentSeason;
      })
    );
  }

  getSeasonsLov(): Observable<SeasonLov[]> {
    return this.getSeason().pipe(
      map((seasons) => {
        return seasons
          .map((s) => {
            const lov: SeasonLov = {
              name: `${s.seasonId.slice(0, 4)}-${s.seasonId.slice(4, 8)}`,
              value: +s.seasonId,
            };

            return lov;
          })
          .reverse();
      })
    );
  }

  //RXJS PIPE TO OBTAIN THE SEASON WEEK RANGES
  seasonRangePipe = () =>
    pipe(
      map((season: Season) => {
        const startSeasonDate = new Date(season.regularSeasonStartDate);
        const endSeasonDate = new Date(season.regularSeasonEndDate);
        const seasonLenghtDays = Math.ceil(
          (endSeasonDate.getTime() - startSeasonDate.getTime()) /
            (1000 * 3600 * 24)
        );
        const seasonLenghtWeeks = Math.ceil(seasonLenghtDays / 7);

        const seasonWeekRange: SeasonWeekRange[] = [];
        let startDateIterator = startSeasonDate;
        let endDateIterator: Date = this.schedule.addDays(
          new Date(season.regularSeasonStartDate),
          6
        );

        seasonWeekRange.push({
          startDate: new Date(season.regularSeasonStartDate),
          endDate: this.schedule.addDays(
            new Date(season.regularSeasonStartDate),
            6
          ),
        });

        for (let i = 0; i < seasonLenghtWeeks; i++) {
          const range: SeasonWeekRange = {
            startDate: this.schedule.addDays(startDateIterator, 7),
            endDate: this.schedule.addDays(endDateIterator, 7),
          };

          seasonWeekRange.push(range);
        }
        seasonWeekRange.pop();
        return seasonWeekRange;
      })
    );
}
