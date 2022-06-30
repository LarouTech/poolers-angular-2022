import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams.component';
import { ScreenTitlePanelModule } from 'src/app/shared/components/screen-title-panel/screen-title-panel.module';
import { DefaultLayoutModule } from 'src/app/shared/components/default-layout/default-layout.module';
import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
  declarations: [TeamsComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    ScreenTitlePanelModule,
    DefaultLayoutModule,
  ],
})
export class TeamsModule {}
