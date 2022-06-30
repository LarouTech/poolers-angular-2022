import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Location } from '@angular/common';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  BehaviorSubject,
  lastValueFrom,
  Observable,
  of,
  take,
  tap,
  map,
  filter,
} from 'rxjs';
import { MENU_DATA } from './toolbar-extension-menu-data';
import { PRESS_GALLERY_DATA } from './toolbar-press-gallery-data';

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
  pressGalleryMenuData = PRESS_GALLERY_DATA;
  _isMenushow = new BehaviorSubject<boolean>(true);
  _isPressGallery = new BehaviorSubject<boolean>(false);

  get isPressGallery$(): Observable<boolean> {
    return this._isPressGallery.asObservable();
  }

  get isMenuShow$(): Observable<boolean> {
    return this._isMenushow.asObservable();
  }

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.setMenuExtensionType();
  }

  setMenuExtensionType() {
    const setter$ = this.router.events.pipe(
      filter((res) => res instanceof NavigationEnd),
      map((res) => {
        const validator = (res as NavigationEnd).url.split('/');

        if (
          (res as NavigationEnd).url === '/press-gallery' ||
          (res as NavigationEnd).url === '/press-gallery/players' ||
          (res as NavigationEnd).url === '/press-gallery/stats' ||
          (res as NavigationEnd).url === '/press-gallery/teams' ||
          (res as NavigationEnd).url === '/press-gallery/standing'
        ) {
          this._isPressGallery.next(true);
          return res;
        }

        if (validator[2] === 'game-details') {
          this._isMenushow.next(false);
        } else {
          this._isMenushow.next(true);
        }
        this._isPressGallery.next(false);
        return res;
      })
    );

    lastValueFrom(setter$);
  }

  onBack() {
    this.location.back();
  }
}
