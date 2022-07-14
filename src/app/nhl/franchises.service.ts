import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  lastValueFrom,
  map,
  Observable,
  pipe,
  switchMap,
  take,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Franchise } from './interfaces/franchise.interface';
import {
  FranchiseAllTime,
  Logo,
} from './interfaces/franchiseAllTime.interface';
import { Game } from './interfaces/game.interface';
import { ScheduledGame } from './interfaces/schedule.interface';
import { Teams } from './interfaces/teams.interface';

export enum LogoType {
  'DARK' = 'dark',
  'LIGHT' = 'light',
  'ALTERNATE' = 'alt',
}

@Injectable({
  providedIn: 'root',
})
export class FranchisesService {
  private url = `${environment.nhlApi}/franchises/all-time`;
  private _franchiseLogos = new BehaviorSubject<FranchiseAllTime[]>(null!);

  get franchiseLogos$(): Observable<FranchiseAllTime[]> {
    return this._franchiseLogos.asObservable();
  }

  constructor(private http: HttpClient) {
    lastValueFrom(this.getFranchisesLogos());
  }

  getLogos(): Observable<(Logo | undefined)[]> {
    return this.getFranchisesLogos().pipe(
      map((franchises) => {
        const activeFranchises = franchises.map((franchise) => {
          return franchise.teams?.find((team) => team.active === 'Y');
        });

        let latestLogo = 0;
        activeFranchises.map((activeFranchise) => {
          activeFranchise?.logos.map((logo) => {
            if (logo.endSeason > latestLogo) {
              latestLogo = logo.endSeason;
            }
          });
        });

        const logo = activeFranchises.map((item) => {
          const darkLogo = item?.logos.find(
            (l) => l.endSeason === latestLogo && l.background === 'dark'
          );

          return darkLogo;
        });

        return logo;
      })
    );
  }

  getLogoById(id: number) {
    return this.getLogos().pipe(
      map((logos) => {
        return logos.find((l) => l?.teamId === id);
      })
    );
  }

  getFranchisesLogos(active?: boolean): Observable<FranchiseAllTime[]> {
    if (!active) {
      active = true;
    }

    const params = active ? new HttpParams().append('logos', true) : null;

    return this.http
      .get<FranchiseAllTime[]>(this.url, { params: params ? params : null! })
      .pipe(
        take(1),
        map((res) => {
          const activeTeams: FranchiseAllTime[] = [];

          res.map((element) => {
            element.teams?.map((item) => {
              if (item.active === 'Y') {
                activeTeams.push(element);
              }
            });
          });

          this._franchiseLogos.next(activeTeams);
          return activeTeams;
        })
      );
  }

  getLogosFromRouteResolver(route: ActivatedRoute) {
    return route.data.pipe(
      take(1),
      map((res) => res['logos'] as FranchiseAllTime[])
    );
  }
}
