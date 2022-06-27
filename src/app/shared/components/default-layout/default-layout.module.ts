import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout.component';
import { FooterModule } from 'src/app/footer/footer.module';

@NgModule({
  declarations: [DefaultLayoutComponent],
  imports: [CommonModule, FooterModule],
  exports: [DefaultLayoutComponent],
})
export class DefaultLayoutModule {}
