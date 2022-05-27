import { Component, OnInit } from '@angular/core';
import {
  AlignItemsTypes,
  JustifyContentType,
} from '../shared/components/primary-layout/primary-layout.component';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  alignItems = AlignItemsTypes.CENTER;
  justifyContent = JustifyContentType.CENTER;

  constructor() {}

  ngOnInit(): void {}
}
