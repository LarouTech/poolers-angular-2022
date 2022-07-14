import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/schedule/schedule.service';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService.selectedSeason$.subscribe((data) => console.log(data));
  }
}
