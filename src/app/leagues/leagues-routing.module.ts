import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './leagues.component';

const routes: Routes = [
  {
    path: '',
    component: LeaguesComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaguesRoutingModule {}
