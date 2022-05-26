import { Component, OnInit } from '@angular/core';
import {
  AlignItemsTypes,
  JustifyContentType,
} from '../shared/components/primary-layout/primary-layout.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  alignItems = AlignItemsTypes.CENTER;
  justifyContent = JustifyContentType.CENTER;
  constructor() {}

  ngOnInit(): void {}
}
