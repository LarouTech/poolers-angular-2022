import { Component, Input, OnInit } from '@angular/core';
import {
  SpinnerColor,
  SpinnerSize,
  SpinnerType,
} from '../load-awesome-spinner/load-awesome-spinner.enums';

@Component({
  selector: 'loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss'],
})
export class LoadingModalComponent implements OnInit {
  spinnerType = SpinnerType['ball-spin-clockwise'];

  constructor() {}

  ngOnInit(): void {}
}
