import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ToolbarModule } from '../shared/components/toolbar/toolbar.module';
import { AuthCardModule } from './auth-card/auth-card.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';
import { LoadingModalModule } from '../shared/components/loading-modal/loading-modal.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadAwesomeSpinnerModule } from '../shared/components/load-awesome-spinner/load-awesome-spinner.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ToolbarModule,
    AuthCardModule,
    PrimaryLayoutModule,
    LoadingModalModule,
    MatDialogModule,
    LoadAwesomeSpinnerModule,
  ],
})
export class HomeModule {}
