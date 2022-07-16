import { Component, OnInit } from '@angular/core';
import { switchMap, take, tap, of } from 'rxjs';
import { PlayersService } from 'src/app/nhl/players.service';
import { ScheduleService } from 'src/app/schedule/schedule.service';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  constructor(
    private playerService: PlayersService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {}
}
