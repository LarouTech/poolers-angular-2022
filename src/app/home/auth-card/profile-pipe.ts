import { Injectable } from '@angular/core';
import { map, mergeMap, pipe, switchMap } from 'rxjs';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { v4 as uuidv4 } from 'uuid';
import { InitiateAuthCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { AuthService } from './auth.service';
import { Profile, ProfileService } from 'src/app/profile.service';

interface JwtDecoded extends JwtPayload {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfilePipeService {
  constructor(
    private authService: AuthService,
    private profile: ProfileService
  ) {}

  profileRxjsPipe = () => {
    return pipe(
      mergeMap((auth: InitiateAuthCommandOutput) => {
        const decoded: JwtDecoded = jwt_decode(
          auth.AuthenticationResult?.AccessToken!
        );

        return this.authService.getUser().pipe(
          switchMap((user) => {
            const isProfileExist = user.UserAttributes?.find(
              (attr) => attr.Name === 'custom:profileId'
            )?.Value;

            const profile: Profile = {
              id: uuidv4(),
              cognitoSub: decoded.sub,
              creationDate: new Date().toISOString(),
              email: decoded.username,
              lastModified: new Date().toISOString(),
            };

            return !isProfileExist
              ? this.profile.createProfile(profile).pipe(
                  switchMap(() => {
                    return this.authService
                      .UpdateUserAttributes(profile.id)
                      .pipe(
                        map(() => {
                          return profile;
                        })
                      );
                  })
                )
              : this.profile.getProfile(
                  user.UserAttributes?.find(
                    (attr) => attr.Name === 'custom:profileId'
                  )?.Value!
                );
          })
        );
      })
    );
  };
}
