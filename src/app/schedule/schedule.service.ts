import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  switchMap,
  tap,
  of,
  lastValueFrom,
} from 'rxjs';
import { Schedule } from '../nhl/interfaces/schedule.interface';
import {
  SeasonLov,
  SeasonsService,
  SeasonWeekRange,
} from '../nhl/seasons.service';

export interface MonthFilterState {
  index: number;
  state: boolean;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private _rangeIndex = new BehaviorSubject<number>(0);
  private _selectedWeekRange = new BehaviorSubject<SeasonWeekRange>(null!);
  private _selectedSeason = new BehaviorSubject<SeasonLov>(null!);
  private _scheduledGames = new BehaviorSubject<Schedule[]>(null!);
  private _seasonWeekRanges = new BehaviorSubject<SeasonWeekRange[]>(null!);
  private _monthFiltersState = new BehaviorSubject<MonthFilterState[]>(null!);

  get monthFilterilterState$(): Observable<MonthFilterState[]> {
    return this._monthFiltersState.asObservable();
  }

  get seasonWeekRanges$(): Observable<SeasonWeekRange[]> {
    return this._seasonWeekRanges.asObservable();
  }

  get scheduledGames$(): Observable<Schedule[]> {
    return this._scheduledGames.asObservable();
  }

  get rangeIndex$() {
    return this._rangeIndex.asObservable();
  }

  get selectedWeekRange$() {
    return this._selectedWeekRange.asObservable();
  }

  get selectedSeason$() {
    return this._selectedSeason.asObservable();
  }

  constructor(private seasons: SeasonsService) {
    lastValueFrom(this.setWeekRanges());
  }

  setMonFilterilterState(state: MonthFilterState[]) {
    this._monthFiltersState.next(state);
  }

  setScheduledGames(schedules: Schedule[]) {
    this._scheduledGames.next(schedules);
  }

  setRangeIndex(index: number) {
    this._rangeIndex.next(index);
  }

  setSelectedWeekRanges(range: SeasonWeekRange) {
    this._selectedWeekRange.next(range);
  }

  setSelectedSeason(lov: SeasonLov) {
    this._selectedSeason.next(lov);
  }

  setWeekRanges() {
    return this.selectedSeason$.pipe(
      switchMap((selectedSeason) => {
        if (selectedSeason) {
          return this.getWeekRanges(selectedSeason.value).pipe(
            tap((ranges) => {
              this._seasonWeekRanges.next(ranges);
              this.setSelectedWeekRanges(ranges[0]);
            })
          );
        }
        return of([{ startDate: new Date(), endDate: new Date() }]);
      })
    );
  }

  getWeekRanges(seasonId: number): Observable<SeasonWeekRange[]> {
    return this.seasons
      .getSeasonById(seasonId)
      .pipe(this.seasons.seasonRangePipe());
  }

  dateSanitizer(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toLocaleString(
      'en-us',
      {
        minimumIntegerDigits: 2,
      }
    )}-${date.getDate()}`;
  }
}
