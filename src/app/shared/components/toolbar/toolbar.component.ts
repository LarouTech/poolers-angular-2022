import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/home/auth-card/auth.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input('height') height!: number | string;
  @ViewChild('toolbarEl') toolbarEl!: ElementRef;
  accessToken = localStorage.getItem('AccessToken');
  isAuth$!: Observable<boolean>;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuth$ = of(
      this.authService.validateTokenExpiration(this.accessToken!)
    );
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(
      this.toolbarEl.nativeElement,
      'height',
      this.height ? this.height : '6.8rem'
    );
  }

  onLogoutHandler() {
    this.authService.logout();

    this.router.navigateByUrl('');

    // lastValueFrom(this.authService.logout());
  }
}
