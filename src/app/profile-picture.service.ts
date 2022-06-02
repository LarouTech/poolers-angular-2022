import { Injectable } from '@angular/core';
import { AuthService } from './home/auth-card/auth.service';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigurationService } from './configuration.service';
import {
  BehaviorSubject,
  catchError,
  from,
  lastValueFrom,
  map,
  mergeMap,
  Observable,
  tap,
  throwError,
} from 'rxjs';

import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  GetIdCommand,
  GetIdCommandOutput,
} from '@aws-sdk/client-cognito-identity';

@Injectable({
  providedIn: 'root',
})
export class ProfilePictureService {
  private client!: S3Client;
  private _signedUrl = new BehaviorSubject<string>(null!);

  get signedUrl$() {
    return this._signedUrl.asObservable();
  }

  constructor(
    private configService: ConfigurationService,
    private authService: AuthService
  ) {
    lastValueFrom(
      this.configService.getConfig().pipe(
        tap((config) => {
          this.client = new S3Client({
            region: config.region,
            credentials: this.authService.getCognitoCredentials(),
          });
        })
      )
    );
  }

  //UPDATE SIGNED URL INTO BEHAVIOR SUBJECT
  updateSignedUrlSubject(url: string) {
    this._signedUrl.next(url);
  }

  //BUILD S3 KEY LINK TO COGNITO IDENTITY
  private imageKeyPathBuilder(
    identity: GetIdCommandOutput,
    keyId: string
  ): string {
    return `${this.configService.config.project.name.trim()}/original/${identity.IdentityId?.trim()}/${keyId.trim()}.jpg`;
  }

  //UPLOAD PROFILE PICTURE TO S3
  uploadPicture(file: Blob, keyId: string): Observable<PutItemCommandOutput> {
    const command$ = this.authService.getIdentityId().pipe(
      map((identity) => {
        return new PutObjectCommand({
          Bucket: this.configService.config.s3.pictureRepoBucketName,
          Body: file,
          Key: this.imageKeyPathBuilder(identity, keyId),
          ContentType: file.type,
          ContentLength: file.size,
        });
      })
    );

    return command$.pipe(
      mergeMap((command) => {
        return from(this.client.send(command));
      }),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(error.message).message);
      })
    );
  }

  //GET PROFILE PICTURE S3 SIGNED URL
  getProfilePictureSignUrl(keyId: string): Observable<string> {
    const command$ = this.authService.getIdentityId().pipe(
      map((identity) => {
        return new GetObjectCommand({
          Bucket: this.configService.config.s3.pictureRepoBucketName,
          Key: `${this.configService.config.project.name.trim()}/original/${identity.IdentityId?.trim()}/${keyId.trim()}.jpg`,
        });
      })
    );

    return command$.pipe(
      mergeMap((command) => {
        return from(
          getSignedUrl(this.client, command, { expiresIn: 5000 })
        ).pipe(tap((url) => this._signedUrl.next(url)));
      }),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(error.message).message);
      })
    );
  }
}
