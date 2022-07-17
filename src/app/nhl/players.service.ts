import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from './interfaces/player.interface';
import { tap, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  cachePlayers = JSON.parse(localStorage.getItem('players')!) as Player[];
  private url = `${environment.nhlApi}/players`;
  private _players = new BehaviorSubject<Player[]>(this.cachePlayers);

  private _playersLoading = new BehaviorSubject<boolean>(false);

  get playerLoading$(): Observable<boolean> {
    return this._playersLoading.asObservable();
  }

  get players$(): Observable<Player[]> {
    return this._players.asObservable().pipe(take(1));
  }

  constructor(private http: HttpClient) {}

  getPlayers(season?: number): Observable<Player[]> {
    this._playersLoading.next(true);
    const params = new HttpParams().set('season', season!);

    return this.http.get<Player[]>(`${this.url}/all`, { params }).pipe(
      map((players) => {
        return this.shuffleFisherYates(players);
      }),
      tap((res) => {
        this._playersLoading.next(false);
        this._players.next(res);
      })
    );
  }

  shuffleFisherYates(array: any[]) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * i);
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
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
      take(1),
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
