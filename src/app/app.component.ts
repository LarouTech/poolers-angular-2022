import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { fadeInAnimation } from './animation';
import { Icons, IconService } from './services/icon.service';
import { AuthService } from './toolbar/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation],
})
export class AppComponent {
  private icons = Icons;
  isAuth$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private iconService: IconService
  ) {
    this.icons.forEach((icon) => this.iconService.generateSvgMatIcon(icon));
  }

  ngOnInit(): void {
    this.detectAuthStateFromToken();
    this.isAuth$ = this.authService.isAuth$;
  }

  private detectAuthStateFromToken() {
    if (localStorage.getItem('AccessToken')) {
      const authState = this.authService.validateTokenExpiration(
        localStorage.getItem('AccessToken')!
      );

      this.authService.setAuthState(authState);
    } else {
      this.authService.setAuthState(false);
    }
  }
}
