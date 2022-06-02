import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Schedule } from './interfaces/schedule.interface';

@Injectable({
  providedIn: 'root',
})
export class NhlSheduleService {
  private url = `${environment.nhlApi}/schedule`;

  constructor(private http: HttpClient) {}

  getSchedule(): Observable<Schedule> {
    return this.http.get<Schedule>(this.url).pipe(
      tap((res) => {
        console.log(res.games);
      })
    );
  }
}
