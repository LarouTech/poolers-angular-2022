import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduledGame } from 'src/app/nhl/interfaces/schedule.interface';

@Component({
  selector: 'schedule-score',
  templateUrl: './schedule-score.component.html',
  styleUrls: ['./schedule-score.component.scss'],
})
export class ScheduleScoreComponent implements OnInit {
  @Input('game') game$!: Observable<ScheduledGame>;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
}
