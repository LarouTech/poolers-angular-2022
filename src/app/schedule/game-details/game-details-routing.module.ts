import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDetailsComponent } from './game-details.component';
import { RouterModule, Routes } from '@angular/router';
import { GameContentResolver } from './game-content.resolver';

const routes: Routes = [
  {
    path: '',
    component: GameDetailsComponent,
    resolve: { gameContent: GameContentResolver },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameDetailsRoutingModule {}
