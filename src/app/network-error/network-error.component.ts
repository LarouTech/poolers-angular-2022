import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlignItemsTypes,
  FlexDirectionType,
  JustifyContentType,
} from '../shared/components/primary-layout/primary-layout.component';

@Component({
  selector: 'network-error',
  templateUrl: './network-error.component.html',
  styleUrls: ['./network-error.component.scss'],
})
export class NetworkErrorComponent implements OnInit {
  alignItems = AlignItemsTypes.CENTER;
  justifyContent = JustifyContentType.CENTER;
  flexDirection = FlexDirectionType.COLUMN;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onReload() {
    this.router.navigate([''], { queryParams: { reload: true } });
  }
}
