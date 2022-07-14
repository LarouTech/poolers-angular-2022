import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { PlayersService } from 'src/app/nhl/players.service';
import { LayoutService } from 'src/app/services/layout.service';
import { StatsType } from '../stats-card/stats-card.component';

@Component({
  selector: 'stats-home',
  templateUrl: './stats-home.component.html',
  styleUrls: ['./stats-home.component.scss'],
})
export class StatsHomeComponent implements OnInit {
  players$!: Observable<Player[]>;
  skaters$!: Observable<Player[]>;
  innerWidth$!: Observable<number>;

  goaliesNavigatorItems = ['gaa', 'sv%', 'shuouts'];
  playerNavigatorItems = ['points', 'goals', 'assists'];
  skatersStatsType = StatsType.SKATERS;
  goalieStatsType = StatsType.GOALIES;
  defensemenStatsType = StatsType.DEFENSEMEN;
  rookieStatsType = StatsType.ROOKIE;

  constructor(
    private layoutService: LayoutService,
    private playerService: PlayersService
  ) {}

  ngOnInit(): void {
    this.players$ = this.playerService.players$;
    this.innerWidth$ = this.layoutService.innerWidth$;
  }
}
