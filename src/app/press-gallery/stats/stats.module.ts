import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { StatsRoutingModule } from './stats-routing.module';
import { ScreenTitlePanelModule } from 'src/app/shared/components/screen-title-panel/screen-title-panel.module';
import { DefaultLayoutModule } from 'src/app/shared/components/default-layout/default-layout.module';

@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    ScreenTitlePanelModule,
    DefaultLayoutModule,
  ],
  exports: [StatsComponent],
})
export class StatsModule {}
