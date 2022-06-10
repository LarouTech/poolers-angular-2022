import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BackButtonComponent],
  imports: [CommonModule, MatIconModule],
  exports: [BackButtonComponent],
})
export class BackButtonModule {}
