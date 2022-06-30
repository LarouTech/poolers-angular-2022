import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StandingComponent } from './standing.component';

const routes: Routes = [
  {
    path: '',
    component: StandingComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandingRoutingModule {}
