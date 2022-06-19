import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LoadingModalModule } from '../shared/components/loading-modal/loading-modal.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadAwesomeSpinnerModule } from '../shared/components/load-awesome-spinner/load-awesome-spinner.module';
import { MatIconModule } from '@angular/material/icon';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { FlipOnHoverDirective } from './jumbotron/flip-on-hover.directive';
import { FooterComponent } from '../footer/footer.component';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [HomeComponent, JumbotronComponent, FlipOnHoverDirective],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ToolbarModule,
    LoadingModalModule,
    MatDialogModule,
    LoadAwesomeSpinnerModule,
    MatIconModule,
    FooterModule,
  ],
})
export class HomeModule {}
