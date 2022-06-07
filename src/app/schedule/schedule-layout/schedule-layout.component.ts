import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {
  BehaviorSubject,
  lastValueFrom,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { LayoutService } from 'src/app/layout.service';
import { NhlSheduleService } from 'src/app/nhl/nhl-shedule.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'schedule-layout',
  templateUrl: './schedule-layout.component.html',
  styleUrls: ['./schedule-layout.component.scss'],
})
export class ScheduleLayoutComponent implements OnInit {
  height$: Observable<number> = of();
  width$: Observable<number> = of();

  rowHeight$!: Observable<number>;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: `Upcoming Games`, cols: 2, rows: 1 },
          // { title: 'Card 2', cols: 1, rows: 2 },
          // { title: 'Card 3', cols: 1, rows: 1 },
          // { title: 'Card 4', cols: 2, rows: 1 },
        ];
      }

      return [
        { title: `Upcoming Games`, cols: 2, rows: 1 },
        // { title: 'Card 2', cols: 1, rows: 2 },
        // { title: 'Card 3', cols: 1, rows: 2 },
        // { title: 'Card 4', cols: 2, rows: 1 },
      ];
    })
  );

  constructor(
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // this.height$ = this.layoutService.innerHeight$.pipe(map((res) => 1700));

    this.height$ = this.route.data.pipe(map((res) => res['layoutHeight']));
  }
}
