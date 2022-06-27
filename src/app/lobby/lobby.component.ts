import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, lastValueFrom, Observable, tap } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../toolbar/auth/auth.service';

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  @ViewChild('containerEl') containerEl!: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // this.authService.stopLoadingSpinnerFromRouter(this.router);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.router.events
    //   .pipe(
    //     filter((e) => e instanceof NavigationStart),
    //     tap((res) => {
    //       this.renderer.setStyle(this.containerEl.nativeElement, 'opacity', 0);
    //     })
    //   )
    //   .subscribe();
  }
}
