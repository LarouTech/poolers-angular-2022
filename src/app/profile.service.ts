import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PutItemCommandOutput,
  UpdateItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { ConfigurationService } from './configuration.service';

export interface Profile {
  id: string;
  email?: string;
  creationDate?: string;
  lastModified?: string;
  cognitoSub?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  imageKeyId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private url = 'https://poolers.techkronik.com';
  _loadingProfile = new BehaviorSubject<boolean>(false);

  get loadingProfile$() {
    return this._loadingProfile.asObservable();
  }

  private _profile = new BehaviorSubject<Profile>(null!);

  get profile$() {
    return this._profile.asObservable();
  }

  constructor(private http: HttpClient, private config: ConfigurationService) {}

  //CREATE PROFILE IN DYNAMODB
  createProfile(profile: Profile): Observable<PutItemCommandOutput | unknown> {
    const payload = {
      tableName: this.config.config.dynamodb.profileTablename,
      region: this.config.config.region,
      item: { ...profile },
    };

    const url = `${this.url}/createProfile`;

    return this.http.post<PutItemCommandOutput>(`${url}`, payload).pipe(
      catchError((error) => {
        return of(error);
      })
    );
  }

  //UPDATE PROFILE IN DYNAMODB
  updateProfile(profile: Profile): Observable<UpdateItemCommandOutput> {
    this._loadingProfile.next(true);
    const payload = {
      tableName: this.config.config.dynamodb.profileTablename,
      region: this.config.config.region,
      item: { ...profile },
    };

    const url = `${this.url}/updateProfile`;

    return this.http.post<UpdateItemCommandOutput>(`${url}`, payload).pipe(
      map((res) => {
        console.log(res);
        return res;
      }),
      tap(() => {
        this._profile.next(profile);
      }),
      tap(() => this._loadingProfile.next(false)),
      catchError((error) => {
        this._loadingProfile.next(false);
        console.log(error);
        return of(error);
      })
    );
  }

  //GET PROFILE FROM DYNAMODB
  getProfile(id: string): Observable<Profile> {
    if (!this.config || !this.config.config) {
      return of();
    }

    const payload = {
      tableName: this.config.config.dynamodb.profileTablename,
      region: this.config.config.region,
      profileId: id,
    };

    const url = `${this.url}/getProfile`;

    return this.http.post<Profile>(url, payload).pipe(
      map((data: any) => {
        const profileFromDynamo = data['Item'] as Profile;

        const transformProfiletoArr = Object.entries(profileFromDynamo);

        let profile: any = {};

        transformProfiletoArr.forEach((el) => {
          profile[el[0]] = el[1]['S'];
        });

        this._profile.next(profile);
        return profile as Profile;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }
}
