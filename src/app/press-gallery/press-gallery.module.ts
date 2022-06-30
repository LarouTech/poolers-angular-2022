import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PressGalleryComponent } from './press-gallery.component';
import { PressGalleryRoutingModule } from './press-gallery-routing.module';
import { DefaultLayoutModule } from '../shared/components/default-layout/default-layout.module';
import { ScreenTitlePanelModule } from '../shared/components/screen-title-panel/screen-title-panel.module';

@NgModule({
  declarations: [PressGalleryComponent],
  imports: [
    CommonModule,
    PressGalleryRoutingModule,
    DefaultLayoutModule,
    ScreenTitlePanelModule,
    PressGalleryRoutingModule,
  ],
  exports: [PressGalleryComponent],
})
export class PressGalleryModule {}
