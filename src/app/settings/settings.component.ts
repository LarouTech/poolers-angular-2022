import { Component, OnInit } from '@angular/core';
import { SpinnerType } from '../shared/components/load-awesome-spinner/load-awesome-spinner.enums';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  spinnerType = SpinnerType['ball-pulse-rise'];
  constructor() {}

  ngOnInit(): void {}
}
