import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'game-details-layout',
  templateUrl: './game-details-layout.component.html',
  styleUrls: ['./game-details-layout.component.scss'],
})
export class GameDetailsLayoutComponent {
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { id: 1, title: 'Card 1', cols: 2, rows: 1 },
          { id: 2, title: 'Card 2', cols: 1, rows: 2 },
          { id: 3, title: 'Card 3', cols: 1, rows: 2 },
          { id: 4, title: 'Card 4', cols: 2, rows: 1 },
        ];
      }

      return [
        { id: 1, title: 'Card 1', cols: 2, rows: 1 },
        { id: 2, title: 'Card 2', cols: 1, rows: 2 },
        { id: 3, title: 'Card 3', cols: 1, rows: 2 },
        { id: 4, title: 'Card 4', cols: 2, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
