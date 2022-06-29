import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenTitlePanelComponent } from './screen-title-panel.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ScreenTitlePanelComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ScreenTitlePanelComponent],
})
export class ScreenTitlePanelModule {}
