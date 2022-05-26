import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    PrimaryLayoutModule,
    MatIconModule,
  ],
  exports: [NotFoundComponent],
})
export class NotFoundModule {}
