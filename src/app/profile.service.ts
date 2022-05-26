import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { catchError, map, Observable, of } from 'rxjs';
import { ConfigurationService } from './configuration.service';

export interface Profile {
  id: string;
  email?: string;
  creationDate?: string;
  lastModified?: string;
  cognitoSub?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private url = 'https://poolers.techkronik.com';

  constructor(private http: HttpClient, private config: ConfigurationService) {}

  createProfile(profile: Profile): Observable<PutItemCommandOutput | unknown> {
    const payload = {
      tableName: this.config.config.dynamodb.profileTablename,
      region: this.config.config.region,
      item: { ...profile },
    };

    const url = `${this.url}/createProfile`;

    return this.http
      .post<PutItemCommandOutput>(`${this.url}/createProfile`, payload)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      );
  }

  getProfile(id: string): Observable<Profile> {
    const payload = {
      tableName: this.config.config.dynamodb.profileTablename,
      region: this.config.config.region,
      profileId: id,
    };

    const url = `${this.url}/getProfile`;

    return this.http.post<Profile>(url, payload).pipe(
      map((data: any) => {
        const profile = data['Item'] as Profile;
        return profile;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }
}
