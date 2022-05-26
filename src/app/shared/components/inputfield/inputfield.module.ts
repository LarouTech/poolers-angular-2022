import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputfieldComponent } from './inputfield.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputfieldComponent],
  imports: [CommonModule, MatIconModule, FormsModule],
  exports: [InputfieldComponent],
})
export class InputfieldModule {}
