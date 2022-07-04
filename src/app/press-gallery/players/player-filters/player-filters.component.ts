import { Component, OnInit } from '@angular/core';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  lastValueFrom,
  map,
  take,
  of,
  filter,
  tap,
} from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { PlayersService } from 'src/app/nhl/players.service';
import { Paginator } from 'src/app/shared/components/paginator/paginator.component';
import { PaginatorService } from 'src/app/shared/components/paginator/paginator.service';

interface SelectFilter {
  name: string;
  icon: string;
}

@Component({
  selector: 'player-filters',
  templateUrl: './player-filters.component.html',
  styleUrls: ['./player-filters.component.scss'],
})
export class PlayerFiltersComponent implements OnInit {
  filters: SelectFilter[] = [
    {
      name: 'position',
      icon: 'matchup',
    },
    {
      name: 'nationality',
      icon: 'flag',
    },
    {
      name: 'team',
      icon: 'team',
    },
    {
      name: 'hand',
      icon: 'side',
    },
    {
      name: 'rookie',
      icon: 'baby',
    },
  ];

  constructor(
    private paginatorService: PaginatorService,
    private playerService: PlayersService
  ) {}

  ngOnInit(): void {}

  onSelect(event: any) {}

  onSearchPlayer(event: any) {
    const playersCopy = JSON.parse(
      localStorage.getItem('players')!
    ) as Player[];

    const filteredPlayers$ = this.playerService.players$.pipe(
      take(1),
      debounceTime(300),
      map((players) => {
        if (event.length <= 0) {
          this.playerService.setPlayers(playersCopy);
          return players;
        }

        const searchPlayers = playersCopy.filter((s) => {
          if (s.fullName.toLowerCase().includes(event)) {
            return s;
          }
          return;
        });

        const pagination: Paginator = {
          data: [searchPlayers],
          numberOfItems: searchPlayers.length,
          pages: 1,
          paginatorIndex: 0,
          lastChunkIndexes: 0,
        };

        this.paginatorService.setPaginator(pagination);
        this.playerService.setPlayers(searchPlayers);
        return searchPlayers;
      })
    );

    lastValueFrom(filteredPlayers$);
  }
}
