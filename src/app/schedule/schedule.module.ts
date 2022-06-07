import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { LoadingModalModule } from '../shared/components/loading-modal/loading-modal.module';
import { ScheduleLayoutComponent } from './schedule-layout/schedule-layout.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { ScheduleItemComponent } from './schedule-item/schedule-item.component';
import { ScheduleGamesComponent } from './schedule-games/schedule-games.component';

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleLayoutComponent,
    ScheduleGamesComponent,
    ScheduleItemComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    PrimaryLayoutModule,
    MatIconModule,
    LoadingModalModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    LayoutModule,
  ],
  exports: [ScheduleComponent],
})
export class ScheduleModule {}
