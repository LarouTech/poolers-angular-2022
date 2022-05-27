import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandingComponent } from '../standing/standing.component';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './stats.component';

const routes: Routes = [
  {
    path: '',
    component: StatsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsRoutingModule {}
