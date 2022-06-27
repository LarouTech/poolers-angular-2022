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

  //GET SCHEDULE FROM NHL API
  getSchedule(
    expand?: ScheduleExpands,
    season?: number,
    startDate?: string,
    endDate?: string
  ): Observable<Schedule[]> {
    let params = new HttpParams();

    if (season) {
      params = params.append('season', season!);
    }

    if (expand) {
      params = params.append('expand', expand!);
    }

    if (startDate) {
      params = params.append('startDate', startDate!);
    }

    if (endDate) {
      params = params.append('endDate', endDate!);
    }

    return this.http.get<Schedule[]>(this.url, { params });
  }

  //FORMAT DATE STRING AS PER NHL API FORMAT
  dateFormatter(date: Date, seperator?: string): string {
    const month =
      date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth();
    const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();

    const today = `${date.getFullYear()}${seperator ? seperator : '-'}${month}${
      seperator ? seperator : '-'
    }${day}`;

    return today;
  }

  //ADD DAYS TO A DATE OBJECTY
  addDays(date: Date, days: number) {
    return new Date(date.setDate(date.getDate() + days));
  }

  //REMOVE DAYS TO A DATE OBJECT
  removeDays(date: Date, days: number) {
    return new Date(date.setDate(date.getDate() - days));
  }
}
