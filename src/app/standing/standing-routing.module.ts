import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandingComponent } from './standing.component';
import { RouterModule, Routes } from '@angular/router';

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
