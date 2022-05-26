import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthCardTabType } from './bottom-navigator.component';

@Injectable({
  providedIn: 'root',
})
export class BottomNavigatorService {
  _currentTab = new BehaviorSubject<AuthCardTabType>(AuthCardTabType.LOGIN);
  _isValidate = new BehaviorSubject<boolean>(false);

  get currentTab(): Observable<AuthCardTabType> {
    return this._currentTab.asObservable();
  }

  constructor() {}
}
