import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaguesComponent } from './leagues.component';
import { LeaguesRoutingModule } from './leagues-routing.module';
import { FooterModule } from '../footer/footer.module';
import { DefaultLayoutModule } from '../shared/components/default-layout/default-layout.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LeaguesComponent],
  imports: [
    CommonModule,
    LeaguesRoutingModule,
    FooterModule,
    DefaultLayoutModule,
    MatIconModule,
  ],
  exports: [LeaguesComponent],
})
export class LeaguesModule {}
