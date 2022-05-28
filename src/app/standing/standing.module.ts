import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandingComponent } from './standing.component';
import { StandingRoutingModule } from './standing-routing.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';
import { StandingTableComponent } from './standing-table/standing-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [StandingComponent, StandingTableComponent],
  imports: [CommonModule, StandingRoutingModule, PrimaryLayoutModule, MatTableModule, MatPaginatorModule, MatSortModule],
  exports: [StandingComponent],
})
export class StandingModule {}
