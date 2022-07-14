import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { PlayersService } from 'src/app/nhl/players.service';

@Component({
  selector: 'stats-home',
  templateUrl: './stats-home.component.html',
  styleUrls: ['./stats-home.component.scss'],
})
export class StatsHomeComponent implements OnInit {
  players$!: Observable<Player[]>;
  skaters$!: Observable<Player[]>;

  goaliesNavigatorItems = ['gaa', 'sv%', 'shuouts'];

  constructor(private playerService: PlayersService) {}

  ngOnInit(): void {
    this.players$ = this.playerService.players$;
  }
}
