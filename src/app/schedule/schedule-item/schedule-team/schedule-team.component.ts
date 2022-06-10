import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { ScheduledGame } from 'src/app/nhl/interfaces/schedule.interface';

@Component({
  selector: 'schedule-team',
  templateUrl: './schedule-team.component.html',
  styleUrls: ['./schedule-team.component.scss'],
})
export class ScheduleTeamComponent implements OnInit {
  @Input('game') game$!: Observable<ScheduledGame>;
  @Input('isHome') isHome!: boolean;
  @ViewChild('containerEl') containerEl!: ElementRef;

  team$!: Observable<any>;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.team$ = this.game$.pipe(
      map((g) => {
        return this.isHome ? g.teams.home : g.teams.away;
      })
    );
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    !this.isHome
      ? this.renderer.setStyle(
          this.containerEl.nativeElement,
          'flexDirection',
          'row-reverse'
        )
      : null;
  }
}
