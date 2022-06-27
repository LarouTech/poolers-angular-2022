import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { FooterModule } from '../footer/footer.module';
import { DefaultLayoutModule } from '../shared/components/default-layout/default-layout.module';
import { SeasonPickerComponent } from './season-picker/season-picker.component';
import { ScheduleDateRangeComponent } from './schedule-date-range/schedule-date-range.component';
import { ScheduleMonthFilterComponent } from './schedule-month-filter/schedule-month-filter.component';
import { ScheduleGamesComponent } from './schedule-games/schedule-games.component';

@NgModule({
  declarations: [ScheduleComponent, SeasonPickerComponent, ScheduleDateRangeComponent, ScheduleMonthFilterComponent, ScheduleGamesComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MatIconModule,
    FooterModule,
    DefaultLayoutModule,
  ],
  exports: [ScheduleComponent],
})
export class ScheduleModule {}
