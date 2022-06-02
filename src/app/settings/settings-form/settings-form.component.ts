import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  lastValueFrom,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Profile, ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
})
export class SettingsFormComponent implements OnInit {
  profileForm!: FormGroup;
  profile$!: Observable<Profile>;
  _notification = new BehaviorSubject<boolean>(false);

  get notification$() {
    return this._notification.asObservable();
  }

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profile$ = this.profileService.profile$;
    this.profileFormConstructor();
  }

  onCloseNotification(event: boolean) {
    event ? this._notification.next(false) : null;
  }

  private profileFormConstructor() {
    const form$ = this.profile$.pipe(
      map((profile) => {
        this.profileForm = new FormGroup({
          firstName: new FormControl(profile.firstName),
          lastName: new FormControl(profile.lastName),
          username: new FormControl(profile.username),
        });
      })
    );

    lastValueFrom(form$);
  }

  onUpdateProfile() {
    this._notification.next(true);
    const updateProfile$ = this.profile$.pipe(
      mergeMap((profile) => {
        const updatedProfile: Profile = {
          ...profile,
          firstName: this.profileForm.get('firstName')?.value
            ? this.profileForm.get('firstName')?.value
            : '',
          lastName: this.profileForm.get('lastName')?.value
            ? this.profileForm.get('lastName')?.value
            : '',
          username: this.profileForm.get('username')?.value
            ? this.profileForm.get('username')?.value
            : '',
          lastModified: new Date().toISOString(),
          imageKeyId: '',
        };

        return this.profileService.updateProfile(updatedProfile).pipe(take(1));
      })
    );

    lastValueFrom(
      updateProfile$.pipe(
        take(1),
        tap((res) => console.log(res)),
        catchError((error) => {
          this._notification.next(false);
          return of(error);
        })
      )
    );
  }

  onResetFormValue() {
    console.log('ca reset');
    this.profileForm.reset();

    const formResetter$ = this.profile$.pipe(
      tap((profile) => {
        this.profileForm.controls['firstName'].setValue(profile.firstName);
        this.profileForm.controls['lastName'].setValue(profile.lastName);
        this.profileForm.controls['username'].setValue(profile.username);
      })
    );

    lastValueFrom(formResetter$);
  }
}
