import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  AlignItemsTypes,
  JustifyContentType,
} from '../shared/components/primary-layout/primary-layout.component';

@Component({
  selector: 'network-unavailable',
  templateUrl: './network-unavailable.component.html',
  styleUrls: ['./network-unavailable.component.scss'],
})
export class NetworkUnavailableComponent implements OnInit {
  alignItems = AlignItemsTypes.CENTER;
  justifyContent = JustifyContentType.CENTER;

  constructor() {}

  ngOnInit(): void {}
}
