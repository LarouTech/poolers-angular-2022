import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigResolver } from './config.resolver';
import { AuthGuard } from './home/auth-card/auth.guard';
import { IsAuthenticatedGuard } from './home/auth-card/is-authenticated.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'lobby',
    loadChildren: () =>
      import('./lobby/lobby.module').then((m) => m.LobbyModule),
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
  },
  {
    path: 'stats',
    loadChildren: () =>
      import('./stats/stats.module').then((m) => m.StatsModule),
  },
  {
    path: 'standing',
    loadChildren: () =>
      import('./standing/standing.module').then((m) => m.StandingModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: '503',
    loadChildren: () =>
      import('./network-error/network-error.module').then(
        (m) => m.NetworkErrorModule
      ),
  },
  {
    path: '***',
    redirectTo: '404',
  },
  {
    path: '404',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
