import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  ConfigResponse,
  ConfigurationService,
} from '../services/configuration.service';

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
