import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FranchisesService } from '../nhl/franchises.service';
import { FranchiseAllTime } from '../nhl/interfaces/franchiseAllTime.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamsLogosResolver implements Resolve<FranchiseAllTime[]> {
  constructor(private franchise: FranchisesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<FranchiseAllTime[]> {
    return this.franchise.getFranchisesLogos();
  }
}
