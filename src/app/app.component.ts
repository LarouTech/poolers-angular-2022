import { Component } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { fadeInAnimation } from './animation';
import { PlayersService } from './nhl/players.service';
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
  uploadInterval = 24 * 60 * 60 * 1000;

  constructor(
    private authService: AuthService,
    private iconService: IconService,
    private playerService: PlayersService
  ) {
    this.icons.forEach((icon) => this.iconService.generateSvgMatIcon(icon));
  }

  ngOnInit(): void {
    this.detectAuthStateFromToken();
    this.isAuth$ = this.authService.isAuth$;
    this.playerWebWorkerInit();
  }

  playerWebWorkerInit() {
    const lastUpload = localStorage.getItem('lastPlayerUpload');
    const elapseTimeSinceUpload = Number(new Date()) - +lastUpload!;

    if (lastUpload && elapseTimeSinceUpload < this.uploadInterval) {
      return;
    }

    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('./players.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.playerService.setPlayers(data);
        localStorage.setItem('players', JSON.stringify(data));
        localStorage.setItem('lastPlayerUpload', Number(new Date()).toString());
      };
      worker.postMessage('players uploaded');
    } else {
      lastValueFrom(this.playerService.getPlayers());
    }
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
