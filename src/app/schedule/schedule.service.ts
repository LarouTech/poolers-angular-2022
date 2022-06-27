import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Schedule } from '../nhl/interfaces/schedule.interface';
import { SeasonLov, SeasonWeekRange } from '../nhl/seasons.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private _rangeIndex = new BehaviorSubject<number>(0);
  private _selectedWeekRange = new BehaviorSubject<SeasonWeekRange>(null!);
  private _selectedSeason = new BehaviorSubject<SeasonLov>(null!);
  private _scheduledGames = new BehaviorSubject<Schedule[]>(null!);

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

  constructor() {}

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

  dateSanitizer(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toLocaleString(
      'en-us',
      {
        minimumIntegerDigits: 2,
      }
    )}-${date.getDate()}`;
  }
}
