import { Component } from '@angular/core';
import { Icons, IconService } from './icon.service';
import { Profile, ProfileService } from './profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private icons = Icons;

  constructor(
    private profile: ProfileService,
    private iconService: IconService
  ) {
    this.icons.forEach((icon) => this.iconService.generateSvgMatIcon(icon));
  }

  ngOnInit(): void {}
}
