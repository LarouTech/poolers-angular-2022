import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from './interfaces/player.interface';
import { tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  cachePlayers = JSON.parse(localStorage.getItem('players')!) as Player[];
  private url = `${environment.nhlApi}/players`;
  private _players = new BehaviorSubject<Player[]>(this.cachePlayers);

  get players$(): Observable<Player[]> {
    return this._players.asObservable();
  }

  constructor(private http: HttpClient) {}

  getPlayers(season?: number): Observable<Player[]> {
    const params = new HttpParams().set('season', season!);

    return this.http.get<Player[]>(`${this.url}/all`, { params }).pipe(
      map((players) => {
        return players;
      }),
      tap((res) => {
        this._players.next(res);
      })
    );
  }

  setPlayers(players: Player[]) {
    this._players.next(players);
  }

  getSkaters() {
    return this.players$.pipe(
      map((players) => {
        players = players.filter(
          (player) =>
            player.primaryPosition.code === 'L' ||
            player.primaryPosition.code === 'R' ||
            player.primaryPosition.code === 'C' ||
            player.primaryPosition.code === 'D'
        );
        return players;
      })
    );
  }

  getRookieSkaters() {
    return this.players$.pipe(
      map((players) => {
        return players.filter(
          (player) =>
            player.rookie === true && player.primaryPosition.code != 'G'
        );
      })
    );
  }

  getDefensemen() {
    return this.players$.pipe(
      map((players) => {
        players = players.filter(
          (player) => player.primaryPosition.code === 'D'
        );
        return players;
      })
    );
  }

  getGoalies() {
    return this.players$.pipe(
      map((players) => {
        players = players.filter(
          (player) => player.primaryPosition.code === 'G'
        );
        return players;
      })
    );
  }
}
