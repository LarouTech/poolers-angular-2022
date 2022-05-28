import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModalComponent } from './loading-modal.component';
import { LoadAwesomeSpinnerModule } from '../load-awesome-spinner/load-awesome-spinner.module';

@NgModule({
  declarations: [LoadingModalComponent],
  imports: [CommonModule, LoadAwesomeSpinnerModule],
  exports: [LoadingModalComponent],
})
export class LoadingModalModule {}
