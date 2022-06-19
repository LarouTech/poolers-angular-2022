import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, tap } from 'rxjs';
import { SignupDto } from './auth/auth.service';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @ViewChild('toolbarEl') toolbarEl!: ElementRef;
  @Input('isAuth') isAuth$!: Observable<boolean>;

  private _signupDto = new BehaviorSubject<SignupDto>(null!);

  get signupDto$() {
    return this._signupDto.asObservable();
  }

  _scrollTopValue = new BehaviorSubject<number>(0);

  get scrollTopValue$(): Observable<number> {
    return this._scrollTopValue.asObservable();
  }

  isLoginMenuOpened$!: Observable<boolean>;
  isSignupMenuOpened$!: Observable<boolean>;
  isHamburgerMenuOpened$!: Observable<boolean>;

  constructor(
    private renderer: Renderer2,
    private toolbarService: ToolbarService
  ) {}

  ngOnInit(): void {
    this.isLoginMenuOpened$ = this.toolbarService.loginMenuState$;
    this.isSignupMenuOpened$ = this.toolbarService.signinMenuState$;
    this.isHamburgerMenuOpened$ = this.toolbarService.hamburgerMenuState$;
  }

  ngAfterViewInit(): void {
    this.styleOnScrolling();
  }

  getSignupDto(signupDto: SignupDto) {
    this._signupDto.next(signupDto);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private styleOnScrolling() {
    const state$ = this.isAuth$.pipe(
      tap((state) => {
        state
          ? this.renderer.setStyle(
              this.toolbarEl.nativeElement,
              'background',
              'linear-gradient(90deg, #101359, #1c1f78)'
            )
          : this.renderer.setStyle(
              this.toolbarEl.nativeElement,
              'background',
              'none'
            );

        window.onscroll = (ev: Event) => {
          const event = ev as any;
          this._scrollTopValue.next(event.target.scrollingElement.scrollTop);

          if (
            event.target.scrollingElement.scrollTop === 0 &&
            state === false
          ) {
            this.renderer.setStyle(
              this.toolbarEl.nativeElement,
              'background',
              'none'
            );
          } else {
            this.renderer.setStyle(
              this.toolbarEl.nativeElement,
              'background',
              'linear-gradient(90deg, #101359, #1c1f78)'
            );
          }
        };
      })
    );

    lastValueFrom(state$);
  }
}
