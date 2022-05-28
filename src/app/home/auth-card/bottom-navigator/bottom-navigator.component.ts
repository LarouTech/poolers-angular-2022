import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  lastValueFrom,
  map,
  Observable,
  of,
  take,
  tap,
} from 'rxjs';
import { BottomNavigatorService } from './bottom-navigator.service';

export enum AuthCardTabType {
  'LOGIN' = 'login',
  'SIGNIN' = 'signin',
  'VALIDATE' = 'validate',
}

export interface AuthCardTabData {
  name: AuthCardTabType;
}

@Component({
  selector: 'bottom-navigator',
  templateUrl: './bottom-navigator.component.html',
  styleUrls: ['./bottom-navigator.component.scss'],
})
export class BottomNavigatorComponent implements OnInit {
  @ViewChild('loginTabEl') loginTabEl!: ElementRef<HTMLDivElement>;
  @ViewChild('signinTabEl') signinTabEl!: ElementRef<HTMLDivElement>;
  @ViewChild('validateTabEl') validateTabEl!: ElementRef<HTMLDivElement>;

  private _currentTabEl = new BehaviorSubject<HTMLDivElement>(null!);
  isValidate$: Observable<boolean> = null!;

  constructor(
    private renderer: Renderer2,
    private tabService: BottomNavigatorService
  ) {}

  ngOnInit(): void {
    this.isValidate$ = this.tabService._isValidate.asObservable();
  }

  ngAfterViewInit(): void {
    if (this._currentTabEl && this.loginTabEl) {
      this._currentTabEl.next(this.loginTabEl.nativeElement);
    }

    if (this.loginTabEl) {
      this.renderer.setStyle(
        this.loginTabEl.nativeElement,
        'backgroundColor',
        'var(--grey200)'
      );
    }
    if (this.signinTabEl) {
      this.renderer.setStyle(
        this.signinTabEl.nativeElement,
        'backgroundColor',
        'var(--light500)'
      );
    }

    this.isValidate$ = this.isValidate$.pipe(
      tap((res) => {
        if (res === true) {
          this.tabService._currentTab.next(AuthCardTabType.VALIDATE);
        }
      })
    );
  }

  onClickTab(el: HTMLDivElement): void {
    const resetStyle$ = this._currentTabEl.asObservable().pipe(
      take(1),
      map((element) => {
        this.renderer.setStyle(element, 'backgroundColor', '#fff');
        return element;
      })
    );

    lastValueFrom(resetStyle$);

    this.renderer.setStyle(el, 'backgroundColor', 'var(--grey200)');
    this._currentTabEl.next(el);
    this.tabService._currentTab.next(el.id as AuthCardTabType);
  }
}
