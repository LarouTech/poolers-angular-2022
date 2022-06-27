import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, Input, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  lastValueFrom,
  Observable,
  of,
  take,
  tap,
} from 'rxjs';
import { MENU_DATA } from './toolbar-extension-menu-data';

@Component({
  selector: 'toolbar-extension',
  templateUrl: './toolbar-extension.component.html',
  styleUrls: ['./toolbar-extension.component.scss'],
  animations: [
    trigger('openClose', [
      state('opened', style({ width: '16rem' })),
      state('closed', style({ width: '0rem' })),
      transition('closed <=> opened', animate('450ms ease-out')),
      transition('opened <=> closed', animate('400ms ease-in')),
    ]),
  ],
})
export class ToolbarExtensionComponent implements OnInit {
  @Input('isAuth') isAuth$!: Observable<boolean>;
  menuData = MENU_DATA;

  constructor() {}

  ngOnInit(): void {}
}
