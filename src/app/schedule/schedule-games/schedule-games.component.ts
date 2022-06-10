import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { GameDataType } from 'src/app/nhl/enum/gameDataType';
import { ScheduleExpands } from 'src/app/nhl/enum/scheduleExpands';
import { GamesService } from 'src/app/nhl/games.service';
import { Schedule } from 'src/app/nhl/interfaces/schedule.interface';
import { NhlSheduleService } from 'src/app/nhl/nhl-shedule.service';
import { SeasonsService } from 'src/app/nhl/seasons.service';

@Component({
  selector: 'schedule-games',
  templateUrl: './schedule-games.component.html',
  styleUrls: ['./schedule-games.component.scss'],
})
export class ScheduleGamesComponent implements OnInit {
  scheduleGames$!: Observable<Schedule[]>;
  today!: string;

  constructor(
    private seasons: SeasonsService,
    private nhlSchedule: NhlSheduleService
  ) {}

  ngOnInit(): void {
    this.today = this.nhlSchedule.dateFormatter(new Date());
    this.scheduleGames$ = this.getRemainingGames().pipe(take(1));
  }

  getRemainingGames(): Observable<Schedule[]> {
    return this.seasons.currentSeason$.pipe(
      switchMap((season) => {
        return season
          ? this.nhlSchedule.getSchedule(
              ScheduleExpands.LINESCORE,
              this.today,
              season.seasonEndDate
            )
          : of();
      })
    );
  }
}
