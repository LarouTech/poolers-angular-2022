import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { PlayersService } from 'src/app/nhl/players.service';
import { Paginator } from './paginator.component';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  _paginator = new BehaviorSubject<Paginator>(null!);
  paginatorIntialValue!: Paginator;

  get paginator$(): Observable<Paginator> {
    return this._paginator.asObservable();
  }

  constructor() {}

  setPaginator(paginator: Paginator) {
    this._paginator.next(paginator);
  }
}
