import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface HockeyPositions {
  abbrev: string;
  code: string;
  fullName: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class NhlConfigurationsService {
  private url = `${environment.nhlApi}/configurations`;

  constructor(private http: HttpClient) {}

  getPositions(): Observable<HockeyPositions[]> {
    return this.http.get<HockeyPositions[]>(`${this.url}/positions`).pipe(
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
  }
}
