import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  map,
  Observable,
  tap,
  catchError,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ConfigPayload {
  region?: string;
  parameterName: string;
}

export interface ConfigResponse {
  project: {
    name: string;
    domainName: string;
  };
  region: string;
  cognito: {
    userPoolId: string;
    userPoolClientId: string;
    identityPoolId: string;
  };
  dynamodb: {
    profileTablename: string;
  };
  s3: {
    pictureRepoBucketName: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private _config = new BehaviorSubject<ConfigResponse>(null!);

  get config(): ConfigResponse {
    return this._config.getValue();
  }

  constructor(private router: Router, private http: HttpClient) {}

  getConfig(): Observable<ConfigResponse> {
    const payload: ConfigPayload = {
      parameterName: `/${environment.projectName}/${environment.stage}/config`,
      region: environment.region,
    };

    return this.http
      .post<ConfigResponse>(
        `https://${environment.projectName}.${environment.domaineName}.com/config`,
        payload
      )
      .pipe(
        map((res) => {
          const config = JSON.parse((res as any)['Value']) as ConfigResponse;
          this._config.next(config);
          return config;
        }),
        catchError((error) => {
          if (error.name === 'HttpErrorResponse') {
            this.router.navigateByUrl('503');
          }

          return throwError(() => new Error(error.message).message);
        })
      );
  }
}
