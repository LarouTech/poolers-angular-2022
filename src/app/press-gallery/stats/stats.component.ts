import { Component, OnInit } from '@angular/core';
import { filter, take, tap, of, lastValueFrom } from 'rxjs';
import { PlayersService } from 'src/app/nhl/players.service';
import { ScheduleService } from 'src/app/schedule/schedule.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  constructor(
    private playerService: PlayersService,
    private scheduleService: ScheduleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetPlayersToCurrentSeason();
  }

  resetPlayersToCurrentSeason(): void {
    const result$ = this.router.events.pipe(
      filter((ev) => ev instanceof NavigationEnd),
      tap(() => this.playerService.setPlayers(this.playerService.cachePlayers))
    );

    lastValueFrom(result$);
  }
}
