import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
})
export class StatsCardComponent implements OnInit {
  @Input('title') title!: string;
  @Input('icon') icon!: string;
  @Input('navigatorMenuItems') navigatorMenuItems: string[] = [
    'points',
    'goals',
    'assists',
  ];

  constructor() {}

  ngOnInit(): void {}
}
