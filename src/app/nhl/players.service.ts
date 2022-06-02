import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from './interfaces/player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private url = `${environment.nhlApi}/players`;

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.url}/all`);
  }
}
