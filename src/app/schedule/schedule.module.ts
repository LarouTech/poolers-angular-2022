import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { LoadingModalModule } from '../shared/components/loading-modal/loading-modal.module';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    PrimaryLayoutModule,
    MatIconModule,
    LoadingModalModule,
  ],
  exports: [ScheduleComponent],
})
export class ScheduleModule {}
