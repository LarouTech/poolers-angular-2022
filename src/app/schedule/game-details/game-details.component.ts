import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/nhl/games.service';
import { map, switchMap } from 'rxjs';
import { GameDataType } from 'src/app/nhl/enum/gameDataType';

@Component({
  selector: 'game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
})
export class GameDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService
  ) {}

  ngOnInit(): void {
    this.getGameDataPerType(GameDataType.CONTENT).subscribe((data) =>
      console.log(data)
    );
  }

  getGameDataPerType(type: GameDataType) {
    return this.route.params.pipe(
      switchMap((params) => {
        return this.gameService.getGame(params['gameId'], type);
      })
    );
  }
}
