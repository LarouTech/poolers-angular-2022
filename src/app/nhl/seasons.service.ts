import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Season } from './interfaces/seasons.interface';

@Injectable({
  providedIn: 'root',
})
export class SeasonsService {
  private url = `${environment.nhlApi}/seasons`;
  private _currentSeason = new BehaviorSubject<Season>(null!);

  get currentSeason$(): Observable<Season> {
    return this._currentSeason.asObservable();
  }

  constructor(private http: HttpClient) {
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
}
