import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';
import { LoadAwesomeSpinnerModule } from '../shared/components/load-awesome-spinner/load-awesome-spinner.module';
import { SettingsLayoutComponent } from './settings-layout/settings-layout.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { CardModule } from '../shared/components/card/card.module';
import { AvatarComponent } from './avatar/avatar.component';
import { InputfieldModule } from '../shared/components/inputfield/inputfield.module';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { MyButtonModule } from '../shared/components/my-button/my-button.module';
import { AvatarEditComponent } from './avatar-edit/avatar-edit.component';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsLayoutComponent,
    AvatarComponent,
    SettingsFormComponent,
    AvatarEditComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    PrimaryLayoutModule,
    LoadAwesomeSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    CardModule,
    InputfieldModule,
    MyButtonModule,
  ],
  exports: [SettingsComponent],
})
export class SettingsModule {}
