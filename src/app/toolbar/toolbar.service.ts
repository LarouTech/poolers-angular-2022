import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  _isLoginMenuOpened = new BehaviorSubject<boolean>(false);
  _isSgninMenuOpened = new BehaviorSubject<boolean>(false);
  _isHamburgerMenuOpened = new BehaviorSubject<boolean>(false);
  private _validateState = new BehaviorSubject<boolean>(false);

  get loginMenuState$() {
    return this._isLoginMenuOpened.asObservable();
  }

  get signinMenuState$() {
    return this._isSgninMenuOpened.asObservable();
  }

  get hamburgerMenuState$() {
    return this._isHamburgerMenuOpened.asObservable();
  }

  get validateState$() {
    return this._validateState.asObservable();
  }

  constructor() {}

  setLoginMenuState(state: boolean) {
    this._isLoginMenuOpened.next(state);
  }

  setSigninMenuState(state: boolean) {
    this._isSgninMenuOpened.next(state);
  }

  setHamburgerMenuState(state: boolean) {
    this._isHamburgerMenuOpened.next(state);
  }

  setValidateState(state: boolean) {
    this._validateState.next(state);
  }
}
