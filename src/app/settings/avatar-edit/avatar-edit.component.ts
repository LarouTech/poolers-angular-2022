import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map, mergeMap, Observable, take, tap } from 'rxjs';
import { Profile, ProfileService } from 'src/app/profile.service';
import * as fs from 'fs';
import { ProfilePictureService } from 'src/app/profile-picture.service';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from 'src/app/home/auth-card/auth.service';

@Component({
  selector: 'avatar-edit',
  templateUrl: './avatar-edit.component.html',
  styleUrls: ['./avatar-edit.component.scss'],
})
export class AvatarEditComponent implements OnInit {
  fileUpload!: Blob;
  profile$!: Observable<Profile>;
  imageUri$!: Observable<string>;

  constructor(
    private authService: AuthService,
    private profilePictureService: ProfilePictureService,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {
    this.profile$ = this.profile.profile$;
    this.imageUri$ = this.profilePictureService.signedUrl$;
  }

  //METHOD TO TRIGGER FILE UPLOAD FROM FORM INPUT
  onFileChanged(event: any): void {
    try {
      if (event.target.files[0].type != 'image/jpeg') {
        const error = new Error('please select a valid image format');
        throw error;
      }
    } catch (error: any) {
      console.log(error.message);
      return;
    }

    try {
      this.fileUpload = event.target.files[0];

      this.onUploadFile();
    } catch (error: any) {
      console.log(error);
    }
  }

  //UPLOAD BLOB TO S3 BUCKET
  onUploadFile() {
    const keyId = uuidv4();
    const uploader$ = this.profilePictureService
      .uploadPicture(this.fileUpload, keyId)
      .pipe(
        take(1),
        mergeMap((res) => {
          return this.profile$.pipe(
            take(1),
            mergeMap((profile) => {
              return this.profile.updateProfile({
                ...profile,
                imageKeyId: keyId,
              });
            })
          );
        }),
        mergeMap(() => {
          return this.profilePictureService
            .getProfilePictureSignUrl(keyId)
            .pipe(
              tap((url) =>
                this.profilePictureService.updateSignedUrlSubject(url)
              )
            );
        })
      );

    lastValueFrom(uploader$);
  }
}
