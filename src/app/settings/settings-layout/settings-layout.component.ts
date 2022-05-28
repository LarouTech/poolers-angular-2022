import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LayoutService } from 'src/app/layout.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'settings-layout',
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss'],
})
export class SettingsLayoutComponent implements OnInit {
  height$: Observable<number> = of();
  width$: Observable<number> = of();

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [{ title: 'Card 1', cols: 2, rows: 1 }];
      }

      return [{ title: 'Card 1', cols: 2, rows: 1 }];
    })
  );

  constructor(
    private layoutService: LayoutService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.height$ = this.layoutService.innerHeight$.pipe(
      map((res) => {
        return res - 120;
      })
    );
  }
}
