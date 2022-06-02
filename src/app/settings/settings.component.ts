import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../profile.service';
import { SpinnerType } from '../shared/components/load-awesome-spinner/load-awesome-spinner.enums';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  profile!: Profile;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.profile = this.route.snapshot.data['profile'] as Profile;
  }
}
