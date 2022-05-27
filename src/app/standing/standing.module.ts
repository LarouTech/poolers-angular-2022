import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandingComponent } from './standing.component';
import { StandingRoutingModule } from './standing-routing.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';

@NgModule({
  declarations: [StandingComponent],
  imports: [CommonModule, StandingRoutingModule, PrimaryLayoutModule],
  exports: [StandingComponent],
})
export class StandingModule {}
