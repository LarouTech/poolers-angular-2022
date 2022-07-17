import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { StatsRoutingModule } from './stats-routing.module';
import { ScreenTitlePanelModule } from 'src/app/shared/components/screen-title-panel/screen-title-panel.module';
import { DefaultLayoutModule } from 'src/app/shared/components/default-layout/default-layout.module';
import { SeasonPickerModule } from 'src/app/shared/components/season-picker/season-picker.module';
import { StatsHomeComponent } from './stats-home/stats-home.component';
import { MatIconModule } from '@angular/material/icon';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { StatsSkatersComponent } from './stats-skaters/stats-skaters.component';
import { StatsTeamsComponent } from './stats-teams/stats-teams.component';
import { ScheduleService } from 'src/app/schedule/schedule.service';
import { StatsCardItemComponent } from './stats-card/stats-card-item/stats-card-item.component';
import { TeamLogoPipe } from './stats-card/stats-card-item/team-logo.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    StatsComponent,
    StatsHomeComponent,
    StatsCardComponent,
    StatsSkatersComponent,
    StatsTeamsComponent,
    StatsCardItemComponent,
    TeamLogoPipe,
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    ScreenTitlePanelModule,
    DefaultLayoutModule,
    SeasonPickerModule,
    MatIconModule,
    RouterModule,
  ],
  providers: [ScheduleService],
  exports: [StatsComponent],
})
export class StatsModule {}
