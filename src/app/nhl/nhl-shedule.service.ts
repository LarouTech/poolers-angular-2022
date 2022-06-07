import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ScheduleExpands } from './enum/scheduleExpands';
import { Schedule } from './interfaces/schedule.interface';

@Injectable({
  providedIn: 'root',
})
export class NhlSheduleService {
  private url = `${environment.nhlApi}/schedule`;

  constructor(private http: HttpClient) {}

  getSchedule(
    expand?: ScheduleExpands,
    startDate?: string,
    endDate?: string
  ): Observable<Schedule[]> {
    const params = new HttpParams()
      .append('expand', expand!)
      .append('startDate', startDate!)
      .append('endDate', endDate!);

    return this.http.get<Schedule[]>(this.url, { params });
  }

  dateFormatter(date: Date, seperator?: string): string {
    const month =
      date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth();
    const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();

    const today = `${date.getFullYear()}${seperator ? seperator : '-'}${month}${
      seperator ? seperator : '-'
    }${day}`;

    return today;
  }
}
