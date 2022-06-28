import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../nhl/interfaces/schedule.interface';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  scheduledGames$!: Observable<Schedule[]>;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduledGames$ = this.scheduleService.scheduledGames$;
  }
}
