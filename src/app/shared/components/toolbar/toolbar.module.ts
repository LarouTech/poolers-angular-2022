import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonModule } from '../back-button/back-button.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, MatIconModule, BackButtonModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
