import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/home/auth-card/auth.service';
import { SideMenuState } from '../primary-layout.component';

export interface MenuItem {
  name: string;
  icon: string;
  selected: boolean;
}

const SIDEDMENU_DATA: MenuItem[] = [
  {
    name: 'stats',
    icon: 'stats',
    selected: false,
  },
  {
    name: 'standing',
    icon: 'standing',
    selected: false,
  },
  {
    name: 'settings',
    icon: 'settings',
    selected: false,
  },
  {
    name: 'logout',
    icon: 'logout',
    selected: false,
  },
];

@Component({
  selector: 'side-menu-list',
  templateUrl: './side-menu-list.component.html',
  styleUrls: ['./side-menu-list.component.scss'],
})
export class SideMenuListComponent implements OnInit {
  @Input('menuState') menuState!: SideMenuState;
  private data = SIDEDMENU_DATA;
  private _menuItems = new BehaviorSubject<MenuItem[]>(this.data);

  get menuItems$() {
    return this._menuItems.asObservable();
  }

  constructor(private router: Router, private authService: AuthService) {
    this.menuState = SideMenuState.CLOSED;
  }

  ngOnInit(): void {}

  logout() {
    lastValueFrom(this.authService.logout()).then(() =>
      this.router.navigateByUrl('')
    );
  }

  onSelectItem(item: MenuItem) {
    if (item.name === 'logout') {
      this.logout();
    }

    const newState = this._menuItems.getValue().map((i) => {
      if (item.name === i.name) {
        i.selected = true;
      } else {
        i.selected = false;
      }
      return i;
    });

    this._menuItems.next(newState);
  }
}
