import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ConfigResponse, ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigResolver implements Resolve<ConfigResponse> {
  constructor(private config: ConfigurationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ConfigResponse> {
    return this.config.getConfig();
  }
}
