import { Component, OnInit } from '@angular/core';
import { lastValueFrom, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
})
export class HamburgerComponent implements OnInit {
  constructor(
    private toolbarService: ToolbarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onLogout() {
    lastValueFrom(
      this.authService.logout().pipe(
        tap((res) => {
          this.toolbarService.setHamburgerMenuState(false);
        })
      )
    );
  }
}
