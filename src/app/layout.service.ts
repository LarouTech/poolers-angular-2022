import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService implements OnDestroy {
  private _innerWidth = new BehaviorSubject<number>(null!);
  private _innerHeight = new BehaviorSubject<number>(null!);
  private getSizeSub!: Subscription;

  get innerWidth$(): Observable<number> {
    return this._innerWidth.asObservable();
  }

  get innerHeight$(): Observable<number> {
    return this._innerHeight.asObservable();
  }

  constructor() {
    this.getSizeSub = this.getSizeWidth().subscribe();
    this._innerWidth.next(window.innerWidth);
    this._innerHeight.next(window.innerHeight);
  }

  private getSizeWidth(): Observable<number> {
    return fromEvent(window, 'resize').pipe(
      map((event: any) => {
        console.log(event);
        this._innerWidth.next(event.target!.innerWidth);
        return event.target!.innerWidth;
      })
    );
  }

  ngOnDestroy() {
    this.getSizeSub ? this.getSizeSub.unsubscribe() : null;
  }
}
