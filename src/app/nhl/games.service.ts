import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GameDataType } from './enum/gameDataType';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private url = `${environment.nhlApi}/games`;

  constructor(private http: HttpClient) {}

  getGame(gameId: number, gameDataType?: GameDataType) {
    const params = new HttpParams();
    gameDataType ? params.append('gameDataType', gameDataType) : null;

    return this.http.get(`${this.url}/${gameId}`, {
      params: params ? params! : undefined,
    });
  }
}
