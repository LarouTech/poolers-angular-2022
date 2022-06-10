import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  lastValueFrom,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { GameDataType } from 'src/app/nhl/enum/gameDataType';
import { FranchisesService } from 'src/app/nhl/franchises.service';
import { GamesService } from 'src/app/nhl/games.service';
import { Logo } from 'src/app/nhl/interfaces/franchiseAllTime.interface';
import { Game } from 'src/app/nhl/interfaces/game.interface';
import { GameContent } from 'src/app/nhl/interfaces/gameContent.interface';
import { PlayoffGame } from 'src/app/nhl/interfaces/playoffGame.interface';
import { Teams } from 'src/app/nhl/interfaces/teams.interface';
import { TeamsService } from 'src/app/nhl/teams.service';

@Component({
  selector: 'game-details-header',
  templateUrl: './game-details-header.component.html',
  styleUrls: ['./game-details-header.component.scss'],
})
export class GameDetailsHeaderComponent implements OnInit {
  gameContent$!: Observable<GameContent>;
  gameLiveData$!: Observable<Game>;
  gamePlayoffData!: Observable<PlayoffGame>;

  private _awayTeam = new BehaviorSubject<Teams>(null!);
  private _homeTeam = new BehaviorSubject<Teams>(null!);

  get awayTeam$(): Observable<Teams> {
    return this._awayTeam.asObservable();
  }

  get homeTeam$(): Observable<Teams> {
    return this._homeTeam.asObservable();
  }

  constructor(
    private teamsService: TeamsService,
    private route: ActivatedRoute,
    private gameService: GamesService,
    private franchise: FranchisesService
  ) {}

  ngOnInit(): void {
    this.gameContent$ = this.route.data.pipe(
      map((data) => data['gameContent'])
    );

    this.gamePlayoffData = this.route.params.pipe(
      switchMap((params) => {
        return this.gameService.getPlayoffGame(params['id']);
      })
    );

    this.gameLiveData$ = this.getGameData(GameDataType.LIVE).pipe(
      map((data) => data as Game)
    );

    lastValueFrom(this.fetchTeamsPlaying());
  }

  private fetchTeamsPlaying() {
    const away$ = this.gameLiveData$.pipe(
      switchMap((data) => {
        return this.teamsService.getTeam(data.gameData.teams.away.id).pipe(
          this.franchise.logoFromTeamIdRxjsPipe(),
          tap((res) => this._awayTeam.next(res))
        );
      })
    );

    const home$ = this.gameLiveData$.pipe(
      switchMap((data) => {
        return this.teamsService.getTeam(data.gameData.teams.home.id).pipe(
          this.franchise.logoFromTeamIdRxjsPipe(),
          tap((res) => this._homeTeam.next(res))
        );
      })
    );

    return combineLatest([away$, home$]);
  }

  private getGameData(type: GameDataType) {
    return this.route.params.pipe(
      switchMap((params) => {
        return this.gameService.getGame(params['id'], type);
      })
    );
  }
}
