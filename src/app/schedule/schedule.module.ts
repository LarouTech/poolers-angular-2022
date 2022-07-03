import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { FooterModule } from '../footer/footer.module';
import { DefaultLayoutModule } from '../shared/components/default-layout/default-layout.module';
import { ScheduleDateRangeComponent } from './schedule-date-range/schedule-date-range.component';
import { ScheduleMonthFilterComponent } from './schedule-month-filter/schedule-month-filter.component';
import { ScheduleGamesComponent } from './schedule-games/schedule-games.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { ScreenTitlePanelModule } from '../shared/components/screen-title-panel/screen-title-panel.module';
import { SeasonPickerModule } from '../shared/components/season-picker/season-picker.module';

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleDateRangeComponent,
    ScheduleMonthFilterComponent,
    ScheduleGamesComponent,
    GameDetailsComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MatIconModule,
    FooterModule,
    DefaultLayoutModule,
    ScreenTitlePanelModule,
    SeasonPickerModule,
  ],
  exports: [ScheduleComponent],
})
export class ScheduleModule {}
