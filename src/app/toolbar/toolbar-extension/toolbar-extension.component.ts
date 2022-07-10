import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Location } from '@angular/common';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import {
  BehaviorSubject,
  lastValueFrom,
  Observable,
  of,
  take,
  tap,
  map,
  filter,
  fromEvent,
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
  @ViewChild('containerEl') containerEl!: ElementRef;
  menuData = MENU_DATA;
  pressGalleryMenuData = PRESS_GALLERY_DATA;
  _isMenushow = new BehaviorSubject<boolean>(true);
  _isPressGallery = new BehaviorSubject<boolean>(false);
  _pageTitile = new BehaviorSubject<string>(null!);

  get pageTitle$() {
    return this._pageTitile.asObservable();
  }

  get isPressGallery$(): Observable<boolean> {
    return this._isPressGallery.asObservable();
  }

  get isMenuShow$(): Observable<boolean> {
    return this._isMenushow.asObservable();
  }

  constructor(
    private renderer: Renderer2,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setMenuExtensionType();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((data: any) => {
          const splitter = data.url.split('/');

          if (splitter[2] === 'game-details') {
            this._pageTitile.next('game details');
          }

          if (splitter[3] === 'player-details') {
            this._pageTitile.next('player details');
          }
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.ajustExtensionOnScroll();
  }

  ajustExtensionOnScroll() {
    const eventController$ = fromEvent(window, 'scroll').pipe(
      map((event) => {
        if (window.pageYOffset >= 0 && window.pageXOffset <= 10) {
          this.renderer.setStyle(
            this.containerEl.nativeElement,
            'height',
            '15rem'
          );
        }

        if (window.pageYOffset > 150) {
          this.renderer.setStyle(
            this.containerEl.nativeElement,
            'height',
            '3.5rem'
          );
        }
      })
    );

    lastValueFrom(eventController$);
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
          this._isMenushow.next(true);
          this._isPressGallery.next(true);
          return res;
        }

        if (
          validator[2] === 'game-details' ||
          validator[3] === 'player-details'
        ) {
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
