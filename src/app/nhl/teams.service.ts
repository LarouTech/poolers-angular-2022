import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeamExpandsType } from './enum/teamsExpands.enum';
import { Teams } from './interfaces/teams.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private url = `${environment.nhlApi}/teams`;

  constructor(private http: HttpClient) {}

  getTeam(id: number): Observable<Teams> {
    const params = new HttpParams().append('expand', TeamExpandsType.ROSTER);

    return this.http.get<Teams>(`${this.url}/${id}`, { params });
  }

  getTeams(): Observable<Teams[]> {
    return this.http.get<Teams[]>(this.url).pipe(
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
  }
}
