import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorService } from './paginator.service';
import { PaginatorComponent } from './paginator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, MatIconModule, MatRippleModule],
  providers: [PaginatorService],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
