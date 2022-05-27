import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkErrorComponent } from './network-error.component';
import { NetworkErrorRoutingModule } from './network-error-routing.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';
import { MatIconModule } from '@angular/material/icon';
import { MyButtonModule } from '../shared/components/my-button/my-button.module';

@NgModule({
  declarations: [NetworkErrorComponent],
  imports: [
    CommonModule,
    NetworkErrorRoutingModule,
    PrimaryLayoutModule,
    MatIconModule,
    MyButtonModule,
  ],
  exports: [NetworkErrorComponent],
})
export class NetworkErrorModule {}
