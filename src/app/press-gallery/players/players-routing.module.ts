import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersComponent,
  },
  {
    path: 'player-details/:id',
    component: PlayerDetailsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersRoutingModule {}
