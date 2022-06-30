import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandingComponent } from './standing.component';
import { ScreenTitlePanelModule } from 'src/app/shared/components/screen-title-panel/screen-title-panel.module';
import { DefaultLayoutModule } from 'src/app/shared/components/default-layout/default-layout.module';
import { StandingRoutingModule } from './standing-routing.module';

@NgModule({
  declarations: [StandingComponent],
  imports: [
    CommonModule,
    ScreenTitlePanelModule,
    DefaultLayoutModule,
    StandingRoutingModule,
  ],
})
export class StandingModule {}
