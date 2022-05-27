import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { StatsRoutingModule } from './stats-routing.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';

@NgModule({
  declarations: [StatsComponent],
  imports: [CommonModule, StatsRoutingModule, PrimaryLayoutModule],
  exports: [StatsComponent],
})
export class StatsModule {}
