import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleModule } from './schedule.module';
import { ScheduleComponent } from './schedule.component';
import { TeamsLogosResolver } from '../resolvers/teams-logos.resolver';
import { GameDetailsComponent } from './game-details/game-details.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    resolve: { logos: TeamsLogosResolver },
  },
  {
    path: 'game-details/:gameId',
    component: GameDetailsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
