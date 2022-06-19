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
    return route.data.pipe(
      take(1),
      map((res) => res['logos'] as FranchiseAllTime[])
    );
  }

  logoFromTeamIdRxjsPipe = (logoType?: LogoType) =>
    pipe(
      switchMap((team: Teams) => {
        return this.franchsiseLogos.pipe(
          map((logos) => {
            const logo = logos.find((l) => l.mostRecentTeamId === team.id)
              ?.teams![0].logos;

            return {
              logo,
            };
          }),
          map((res) => {
            let lastesSeason: number = null!;

            res.logo?.map((l) => {
              if (l.endSeason > lastesSeason) {
                lastesSeason = l.endSeason;
              }
            });

            let lastestLogo: Logo[] = [];

            logoType ? logoType : LogoType.DARK;

            res.logo?.filter((item) => {
              if (
                item.endSeason === lastesSeason &&
                item.background === logoType
              ) {
                console.log('shit happen');
                lastestLogo.push(item);
              }
            });

            console.log(LogoType.DARK);

            return { ...team, logo: lastestLogo[0] as Logo };
          })
        );
      })
    );

  logoFromSchduledGameRxjsPipe = (gameData: ScheduledGame) =>
    pipe(
      map((res: FranchiseAllTime[]) => {
        const awayTeam = res.find(
          (r) =>
            r.mostRecentTeamId ===
            (gameData as ScheduledGame).teams.away.team.id
        );

        const homeTeam = res.find(
          (r) =>
            r.mostRecentTeamId ===
            (gameData as ScheduledGame).teams.home.team.id
        );

        let awayLastestShirt: number = null!;
        let homeLatestShirt: number = null!;

        const lastestAwayLogo = awayTeam?.teams?.find(
          (i) => i.active === 'Y'
        )?.logos;
        const lastestHomeLogo = homeTeam?.teams?.find(
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

        (gameData as ScheduledGame).teams.away.team.logo = awayLogo;
        (gameData as ScheduledGame).teams.home.team.logo = homeLogo;

        return gameData;
      })
    );
}
