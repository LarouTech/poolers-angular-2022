import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule.component';
import { ScheduleLayoutResolver } from './schedule-layout.resolver';
import { TeamsLogosResolver } from '../teams-logos.resolver';
import { GameDetailsComponent } from './game-details/game-details.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    resolve: {
      layoutHeight: ScheduleLayoutResolver,
      logos: TeamsLogosResolver,
    },
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./game-details/game-details.module').then(
        (m) => m.GameDetailsModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
