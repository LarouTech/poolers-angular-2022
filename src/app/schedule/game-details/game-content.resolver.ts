import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { GameDataType } from 'src/app/nhl/enum/gameDataType';
import { GamesService } from 'src/app/nhl/games.service';
import { GameContent } from 'src/app/nhl/interfaces/gameContent.interface';

@Injectable({
  providedIn: 'root',
})
export class GameContentResolver implements Resolve<GameContent> {
  constructor(private gameService: GamesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GameContent> {
    return this.gameService
      .getGame(route.params['id'], GameDataType.CONTENT)
      .pipe(map((data) => data as GameContent));
  }
}
