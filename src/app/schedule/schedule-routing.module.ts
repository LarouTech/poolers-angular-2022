import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleModule } from './schedule.module';
import { ScheduleComponent } from './schedule.component';
import { TeamsLogosResolver } from '../resolvers/teams-logos.resolver';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    resolve: { logos: TeamsLogosResolver },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
