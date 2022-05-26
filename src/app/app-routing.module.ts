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
    path: '**',
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
