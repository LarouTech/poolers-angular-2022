import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AlignItemsTypes,
  JustifyContentType,
} from '../shared/components/primary-layout/primary-layout.component';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  alignItems = AlignItemsTypes.CENTER;
  justifyContent = JustifyContentType.CENTER;
  private _counter = new BehaviorSubject<number>(5);

  get counter$(): Observable<number> {
    return this._counter.asObservable();
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    setInterval(() => {
      this._counter.next(this._counter.getValue() - 1);
    }, 1000);

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 5000);
  }
}
