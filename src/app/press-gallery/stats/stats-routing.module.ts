import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './stats.component';
import { StatsHomeComponent } from './stats-home/stats-home.component';
import { StatsSkatersComponent } from './stats-skaters/stats-skaters.component';
import { StatsTeamsComponent } from './stats-teams/stats-teams.component';

const routes: Routes = [
  {
    path: '',
    component: StatsComponent,

    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: StatsHomeComponent,
      },
      {
        path: 'skaters',
        component: StatsSkatersComponent,
      },
      {
        path: 'teams',
        component: StatsTeamsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsRoutingModule {}
