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

    this.playerService.players$.subscribe((data) => console.log(data));
  }

  playerWebWorkerInit() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('./players.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.playerService.setPlayers(data);
        localStorage.setItem('players', JSON.stringify(data));
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
