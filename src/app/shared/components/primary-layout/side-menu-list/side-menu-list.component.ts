import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/home/auth-card/auth.service';
import { SideMenuState } from '../primary-layout.component';
import { Location } from '@angular/common';

export interface MenuItem {
  name: string;
  icon: string;
  selected: boolean;
}

const SIDEDMENU_DATA: MenuItem[] = [
  {
    name: 'lobby',
    icon: 'lobby',
    selected: false,
  },
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
  @Input('menuState') menuState!: Observable<SideMenuState>;
  @Output('resetMenu') resetMenuState = new EventEmitter<boolean>();

  private data = SIDEDMENU_DATA;
  private _menuItems = new BehaviorSubject<MenuItem[]>(this.data);

  get menuItems$() {
    return this._menuItems.asObservable();
  }

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setInitiaSelectedItem();
  }

  private setInitiaSelectedItem() {
    const currentPath = this.location.path().substring(1);

    this.data.map((item) => {
      if (currentPath === item.name) {
        item.selected = true;
      }

      return item;
    });
  }

  private logout() {
    lastValueFrom(
      this.authService.logout().pipe(
        tap(() => {
          this.data = this.data.map((item) => {
            item.selected = false;
            return item;
          });

          this.resetMenuState.emit(true);
          this.router.navigate(['home']);
        })
      )
    );
  }

  onSelectItem(item: MenuItem) {
    if (item.name === 'logout') {
      this.logout();
      return;
    }

    lastValueFrom(
      this.menuState.pipe(
        tap((state) => {
          this.router.navigate([item.name], {
            queryParams: { menustate: state },
          });
        })
      )
    );

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
