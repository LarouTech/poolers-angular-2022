import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PressGalleryComponent } from './press-gallery.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'players',
    pathMatch: 'full',
  },
  {
    path: 'players',
    loadChildren: () =>
      import('./players/players.module').then((m) => m.PlayersModule),
  },
  {
    path: 'stats',
    loadChildren: () =>
      import('./stats/stats.module').then((m) => m.StatsModule),
  },
  {
    path: 'teams',
    loadChildren: () =>
      import('./teams/teams.module').then((m) => m.TeamsModule),
  },
  {
    path: 'standing',
    loadChildren: () =>
      import('./standing/standing.module').then((m) => m.StandingModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PressGalleryRoutingModule {}
