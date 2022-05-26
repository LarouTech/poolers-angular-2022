import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkUnavailableComponent } from './network-unavailable.component';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NetworkUnavailableComponent],
  imports: [CommonModule, PrimaryLayoutModule, MatIconModule],
  exports: [NetworkUnavailableComponent],
})
export class NetworkUnavailableModule {}
