import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {}
