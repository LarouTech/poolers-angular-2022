import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { PlayersService } from 'src/app/nhl/players.service';
import { SortType } from '../player-sorter/player-sorter.component';
import { Router } from '@angular/router';

interface TableHeader {
  name: string;
  sorter?: SortType;
}

@Component({
  selector: 'player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit {
  @Input('paginatedPlayers') paginatedPlayers$!: Observable<Player[]>;

  headerData: TableHeader[] = [
    { name: 'rank' },
    { name: 'headshot' },
    { name: 'name', sorter: SortType.NAME },
    { name: 'nationality', sorter: SortType.NATIONALITY },
    { name: 'position', sorter: SortType.POSITION },
    { name: 'hand', sorter: SortType.HAND },
    { name: 'age', sorter: SortType.AGE },
    { name: 'height', sorter: SortType.HEIGHT },
    { name: 'weight', sorter: SortType.WEIGHT },
    { name: 'team', sorter: SortType.TEAM },
  ];

  constructor(private router: Router, private players: PlayersService) {}

  ngOnInit(): void {}

  onPlayerDetailsHandler(player: Player) {
    this.router.navigate([
      '/',
      'press-gallery',
      'players',
      'player-details',
      player.id,
    ]);
  }
}
