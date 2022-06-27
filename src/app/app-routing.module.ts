import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './toolbar/auth/auth.guard';
import { IsAuthenticatedGuard } from './toolbar/auth/is-authenticated.guard';

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
  },
  {
    path: 'leagues',
    loadChildren: () =>
      import('./leagues/leagues.module').then((m) => m.LeaguesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'press-gallery',
    loadChildren: () =>
      import('./press-gallery/press-gallery.module').then(
        (m) => m.PressGalleryModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.ScheduleModule),
    canActivate: [AuthGuard],
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
