import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameDataType } from './enum/gameDataType';
import { Game } from './interfaces/game.interface';
import { GameContent } from './interfaces/gameContent.interface';
import { PlayoffGame } from './interfaces/playoffGame.interface';

export enum GameStatusCode {
  'SCHEDULED' = '1',
  'SCHEDULED_TBD' = '8',
  'POSTPONED' = '9',
  'PRE_GAME' = '2',
  'IN_PROGRESS' = '3',
  'IN_PROGRESS_CRITICAL' = '4',
  'GAME_OVER' = '5',
  'FINAL' = '6',
  'FINAL2' = '7',
}

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private url = `${environment.nhlApi}/games`;

  constructor(private http: HttpClient) {}

  getGame(
    gameId: number,
    gameDataType: GameDataType
  ): Observable<Game | GameContent> {
    const params = new HttpParams().append('gameDataType', gameDataType!);

    return this.http.get<Game>(`${this.url}/${gameId}`, {
      params: params ? params! : undefined,
    });
  }

  getPlayoffGame(gameId?: number): Observable<PlayoffGame> {
    const params = gameId ? new HttpParams().append('gameId', gameId!) : null;

    return this.http.get<PlayoffGame>(`${this.url}/playoff`, {
      params: params ? params! : undefined,
    });
  }
}
