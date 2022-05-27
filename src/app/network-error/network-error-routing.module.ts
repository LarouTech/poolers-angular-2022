import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkErrorComponent } from './network-error.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NetworkErrorComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkErrorRoutingModule {}
