import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  lastValueFrom,
  Observable,
  Subscription,
} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _innerWidth = new BehaviorSubject<number>(null!);
  private _innerHeight = new BehaviorSubject<number>(null!);

  get innerWidth$(): Observable<number> {
    return this._innerWidth.asObservable();
  }

  get innerHeight$(): Observable<number> {
    return this._innerHeight.asObservable();
  }

  constructor() {
    lastValueFrom(this.getSizeWidth());
    this._innerWidth.next(window.innerWidth);
    this._innerHeight.next(window.innerHeight);
  }

  private getSizeWidth(): Observable<number> {
    return fromEvent(window, 'resize').pipe(
      map((event: any) => {
        this._innerWidth.next(event.target!.innerWidth);
        this._innerHeight.next(event.target!.innerHeight);
        return event.target!.innerWidth;
      })
    );
  }
}
