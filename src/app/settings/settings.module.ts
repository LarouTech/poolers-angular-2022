import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';
import { LoadAwesomeSpinnerModule } from '../shared/components/load-awesome-spinner/load-awesome-spinner.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    PrimaryLayoutModule,
    LoadAwesomeSpinnerModule,
  ],
  exports: [SettingsComponent],
})
export class SettingsModule {}
