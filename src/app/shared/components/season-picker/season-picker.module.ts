import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SeasonPickerComponent } from './season-picker.component';

@NgModule({
  declarations: [SeasonPickerComponent],
  imports: [CommonModule, MatIconModule],
  exports: [SeasonPickerComponent],
})
export class SeasonPickerModule {}
