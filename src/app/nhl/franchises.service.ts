import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  lastValueFrom,
  map,
  Observable,
  pipe,
  take,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Franchise } from './interfaces/franchise.interface';
import { FranchiseAllTime } from './interfaces/franchiseAllTime.interface';
import { Game } from './interfaces/schedule.interface';

@Injectable({
  providedIn: 'root',
})
export class FranchisesService {
  private url = `${environment.nhlApi}/franchises/all-time`;
  private _franchsiseLogos = new BehaviorSubject<FranchiseAllTime[]>(null!);

  get franchsiseLogos(): Observable<FranchiseAllTime[]> {
    return this._franchsiseLogos.asObservable();
  }

  constructor(private http: HttpClient) {
    lastValueFrom(this.getFranchisesLogos());
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

          this._franchsiseLogos.next(activeTeams);
          return activeTeams;
        })
      );
  }

  getLogosFromRouteResolver(route: ActivatedRoute) {
    return route.data.pipe(map((res) => res['logos'] as FranchiseAllTime[]));
  }

  getLatestLogoRxjsPipe = (scheduledGame: Game) =>
    pipe(
      map((res: FranchiseAllTime[]) => {
        const awayLogos = res.find(
          (r) => r.mostRecentTeamId === scheduledGame.teams.away.team.id
        );

        const homeLogos = res.find(
          (r) => r.mostRecentTeamId === scheduledGame.teams.home.team.id
        );

        let awayLastestShirt: number = null!;
        let homeLatestShirt: number = null!;

        const lastestAwayLogo = awayLogos?.teams?.find(
          (i) => i.active === 'Y'
        )?.logos;
        const lastestHomeLogo = homeLogos?.teams?.find(
          (i) => i.active === 'Y'
        )?.logos;

        lastestAwayLogo?.forEach((el) => {
          if (el.endSeason > awayLastestShirt && el.background === 'dark') {
            awayLastestShirt = el.endSeason;
          }
        });

        lastestHomeLogo?.forEach((el) => {
          if (el.endSeason > homeLatestShirt) {
            homeLatestShirt = el.endSeason;
          }
        });

        const awayLogo = lastestAwayLogo?.find(
          (y) => y.endSeason === awayLastestShirt
        );

        const homeLogo = lastestHomeLogo?.find(
          (y) => y.endSeason === homeLatestShirt
        );

        scheduledGame.teams.away.team.logo = awayLogo;
        scheduledGame.teams.home.team.logo = homeLogo;

        return scheduledGame;
      })
    );
}
