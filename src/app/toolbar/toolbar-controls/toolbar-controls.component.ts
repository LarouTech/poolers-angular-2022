import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, tap } from 'rxjs';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'toolbar-controls',
  templateUrl: './toolbar-controls.component.html',
  styleUrls: ['./toolbar-controls.component.scss'],
})
export class TollbarControlsComponent implements OnInit {
  @Input('isAuth') isAuth$!: Observable<boolean>;
  @ViewChild('loginMenuItemEl') loginMenuItemEl!: ElementRef;
  @ViewChild('signupMenuItemEl') signupMenuItemEl!: ElementRef;
  @ViewChild('hamburgerMenuItemEl') hamburgerMenuItemEl!: ElementRef;
  isLoginMenuOpened$!: Observable<boolean>;
  isSignupMenuOpened$!: Observable<boolean>;
  isHamburgerMenuOpened$!: Observable<boolean>;

  _scrollTopValue = new BehaviorSubject<number>(0);

  constructor(
    private toolbarService: ToolbarService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.isLoginMenuOpened$ = this.toolbarService.loginMenuState$;
    this.isSignupMenuOpened$ = this.toolbarService.signinMenuState$;
    this.isHamburgerMenuOpened$ = this.toolbarService.hamburgerMenuState$;
  }

  ngAfterViewInit(): void {
    this.isSignupActive();
    this.isLoginActive();
  }

  private isLoginActive() {
    const isActive$ = this.toolbarService.loginMenuState$.pipe(
      tap((state) => {
        if (this.loginMenuItemEl) {
          this.renderer.setStyle(
            this.loginMenuItemEl.nativeElement,
            'color',
            state === true ? 'var(--primary200)' : '#fff'
          );
        }
      })
    );

    lastValueFrom(isActive$);
  }

  private isSignupActive() {
    const isActive$ = this.toolbarService.signinMenuState$.pipe(
      tap((state) => {
        if (this.signupMenuItemEl) {
          this.renderer.setStyle(
            this.signupMenuItemEl.nativeElement,
            'color',
            state === true ? 'var(--primary200)' : '#fff'
          );
        }
      })
    );

    lastValueFrom(isActive$);
  }

  toggleSignupMenu() {
    this.toolbarService.setSigninMenuState(
      !this.toolbarService._isSgninMenuOpened.getValue()
    );
    this.toolbarService.setLoginMenuState(false);
    this.toolbarService.setHamburgerMenuState(false);
  }

  toggleLoginMenu() {
    this.toolbarService.setLoginMenuState(
      !this.toolbarService._isLoginMenuOpened.getValue()
    );
    this.toolbarService.setSigninMenuState(false);
    this.toolbarService.setHamburgerMenuState(false);
  }

  toggleHamburger() {
    this.toolbarService.setHamburgerMenuState(
      !this.toolbarService._isHamburgerMenuOpened.getValue()
    );
    this.toolbarService.setSigninMenuState(false);
    this.toolbarService.setLoginMenuState(false);
  }
}
