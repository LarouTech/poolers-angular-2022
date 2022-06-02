import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {
  BehaviorSubject,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { AuthService } from './home/auth-card/auth.service';
import { ProfilePictureService } from './profile-picture.service';
import { Profile, ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<Profile> {
  constructor(
    private profilePictureService: ProfilePictureService,
    private authService: AuthService,
    private profile: ProfileService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Profile> {
    return this.authService.getUser().pipe(
      mergeMap((res) => {
        const id = res.UserAttributes?.find(
          (attr) => attr.Name === 'custom:profileId'
        )?.Value!;

        return this.profile.getProfile(id).pipe(
          mergeMap((profile) => {
            return this.profilePictureService
              .getProfilePictureSignUrl(profile.imageKeyId!)
              .pipe(
                map(() => {
                  return profile;
                })
              );
          })
        );
      })
    );
  }
}
