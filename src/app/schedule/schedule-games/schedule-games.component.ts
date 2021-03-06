import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable, switchMap, tap, of, map } from 'rxjs';
import { ScheduleExpands } from 'src/app/nhl/enum/scheduleExpands';
import { FranchisesService, LogoType } from 'src/app/nhl/franchises.service';
import {
  FranchiseAllTime,
  Logo,
} from 'src/app/nhl/interfaces/franchiseAllTime.interface';
import {
  Schedule,
  ScheduledGame,
} from 'src/app/nhl/interfaces/schedule.interface';
import { NhlSheduleService } from 'src/app/nhl/nhl-shedule.service';
import { LayoutService } from 'src/app/services/layout.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'schedule-games',
  templateUrl: './schedule-games.component.html',
  styleUrls: ['./schedule-games.component.scss'],
})
export class ScheduleGamesComponent implements OnInit {
  scheduledGames$!: Observable<Schedule[]>;
  teamsLogos$!: Observable<FranchiseAllTime[]>;
  innerWidth$!: Observable<number>;

  constructor(
    private nhlSchedule: NhlSheduleService,
    private scheduleService: ScheduleService,
    private franchises: FranchisesService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teamsLogos$ = this.franchises.getFranchisesLogos();
    lastValueFrom(this.fetchScheduledGameByRange());
    this.scheduledGames$ = this.getScheduledGame();
    this.innerWidth$ = this.layoutService.innerWidth$;
  }

  onGameHandler(game: ScheduledGame) {
    this.router.navigate(['schedule', 'game-details', game.gamePk]);
  }

  getScheduledGame(): Observable<Schedule[]> {
    return this.teamsLogos$.pipe(
      switchMap((franchises) => {
        return this.scheduleService.scheduledGames$.pipe(
          map((dates) => {
            if (dates) {
              dates.map((date) => {
                date.games.map((game) => {
                  let awayLogos: Logo[] = franchises.find(
                    (f) => f.mostRecentTeamId === game.teams.away.team.id
                  )?.teams![0].logos!;

                  let lastestAwayLogo: Logo = null!;

                  if (awayLogos) {
                    awayLogos.forEach((logo) => {
                      if (
                        !lastestAwayLogo ||
                        (logo.endSeason > lastestAwayLogo.endSeason &&
                          logo.background === LogoType.LIGHT)
                      ) {
                        lastestAwayLogo = logo;
                      }
                    });
                  }

                  const homeLogos: Logo[] = franchises.find(
                    (f) => f.mostRecentTeamId === game.teams.home.team.id
                  )?.teams![0].logos!;

                  let lastestHomeLogo: Logo = null!;

                  if (homeLogos) {
                    homeLogos.forEach((logo) => {
                      if (
                        !lastestHomeLogo ||
                        (logo.endSeason > lastestHomeLogo.endSeason &&
                          logo.background === LogoType.LIGHT)
                      ) {
                        lastestHomeLogo = logo;
                      }
                    });
                  }

                  game.teams.away.team.logo = lastestAwayLogo;
                  game.teams.home.team.logo = lastestHomeLogo;

                  return game;
                });

                return date;
              });

              return dates;
            }

            return dates;
          })
        );
      })
    );
  }

  private fetchScheduledGameByRange() {
    return this.scheduleService.selectedWeekRange$.pipe(
      switchMap((range) => {
        let startDateStringnify: string;
        let endDateStringnify: string;

        if (range) {
          startDateStringnify = this.scheduleService.dateSanitizer(
            range.startDate
          );

          endDateStringnify = this.scheduleService.dateSanitizer(range.endDate);
        }

        return this.scheduleService.selectedSeason$.pipe(
          switchMap((season) => {
            if (season) {
              return this.nhlSchedule
                .getSchedule(
                  ScheduleExpands.DECISIONS,
                  season.value,
                  startDateStringnify,
                  endDateStringnify
                )
                .pipe(
                  tap((schedules) => {
                    this.scheduleService.setScheduledGames(schedules);
                  })
                );
            }

            return of();
          })
        );
      })
    );
  }
}
