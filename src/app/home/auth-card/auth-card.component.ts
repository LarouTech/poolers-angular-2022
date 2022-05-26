import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import validator from 'validator';
import { AuthCardTabType } from './bottom-navigator/bottom-navigator.component';
import { BottomNavigatorService } from './bottom-navigator/bottom-navigator.service';

@Component({
  selector: 'auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent implements OnInit {
  currentTab: Observable<AuthCardTabType> = of();
  cacheValues: { email: string; password: string } = null!;

  constructor(
    private tabNavigator: BottomNavigatorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentTab = this.tabNavigator.currentTab;
    // this.router.navigate([this.tabNavigator._currentTab.getValue()]);
  }

  getCacheValues(cacheValues: any) {
    this.cacheValues = cacheValues;
  }
}
