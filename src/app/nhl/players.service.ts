import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from './interfaces/player.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private url = `${environment.nhlApi}/players`;
  private _players = new BehaviorSubject<Player[]>(null!);

  get players$() {
    return this._players.asObservable();
  }

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http
      .get<Player[]>(`${this.url}/all`)
      .pipe(tap((res) => this._players.next(res)));
  }
}
