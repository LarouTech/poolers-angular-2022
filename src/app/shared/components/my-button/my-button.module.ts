import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyButtonComponent } from './my-button.component';
import { OnHoverMyButtonDirective } from './on-hover-my-button.directive';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MyButtonComponent, OnHoverMyButtonDirective],
  imports: [CommonModule, MatIconModule],
  exports: [MyButtonComponent],
})
export class MyButtonModule {}
