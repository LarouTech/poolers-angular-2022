import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PressGalleryComponent } from './press-gallery.component';

const routes: Routes = [
  {
    path: '',
    component: PressGalleryComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PressGalleryRoutingModule {}
