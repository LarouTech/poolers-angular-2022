import { Component, Input, OnInit } from '@angular/core';
import { Observable, map, take, lastValueFrom, pipe } from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { PlayersService } from 'src/app/nhl/players.service';

enum SortType {
  'TEAM' = 'team',
  'AGE' = 'age',
}

@Component({
  selector: 'player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit {
  @Input('paginatedPlayers') paginatedPlayers$!: Observable<Player[]>;

  constructor(private players: PlayersService) {}

  ngOnInit(): void {}

  onSort(ev: MouseEvent) {
    const event = ev as any;

    switch (event.target.innerHTML) {
      case SortType.AGE:
        const sortbyAge$ = this.players.players$.pipe(
          take(1),
          map((players) => {
            const sorted = players.sort((a: Player, b: Player) => {
              return a.currentTeam.name.localeCompare(
                b.currentTeam.name,
                undefined,
                {
                  numeric: true,
                  sensitivity: 'base',
                }
              );
            });

            this.players.setPlayers(sorted);

            return players;
          })
        );

        break;

      case SortType.TEAM:
        const sortByTeam$ = this.players.players$.pipe(
          take(1),
          map((players) => {
            const sorted = players.sort((a: Player, b: Player) => {
              return a.currentTeam.name.localeCompare(
                b.currentTeam.name,
                undefined,
                {
                  numeric: true,
                  sensitivity: 'base',
                }
              );
            });

            this.players.setPlayers(sorted);

            return players;
          })
        );

        lastValueFrom(sortByTeam$);

        break;

      default:
        break;
    }
  }
}
