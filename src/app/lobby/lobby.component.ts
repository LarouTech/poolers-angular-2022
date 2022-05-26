import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Profile, ProfileService } from '../profile.service';
import {
  AlignItemsTypes,
  JustifyContentType,
} from '../shared/components/primary-layout/primary-layout.component';

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  alignItems = AlignItemsTypes.FLEX_START;
  justifyContent = JustifyContentType.CENTER;

  constructor(private profile: ProfileService) {}

  ngOnInit(): void {}

  onTestProfile() {
    const profile: Profile = {
      email: 'yanick@weez.com',
      cognitoSub: '12-2-2-2-2-2-2-2',
      creationDate: '2022-05-24',
      id: 'id0008',
      lastModified: 'hey! Right fucking now',
    };

    lastValueFrom(this.profile.createProfile(profile));
  }
}
