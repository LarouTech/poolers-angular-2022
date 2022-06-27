import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PressGalleryComponent } from './press-gallery.component';
import { PressGalleryRoutingModule } from './press-gallery-routing.module';

@NgModule({
  declarations: [PressGalleryComponent],
  imports: [CommonModule, PressGalleryRoutingModule],
  exports: [PressGalleryComponent],
})
export class PressGalleryModule {}
