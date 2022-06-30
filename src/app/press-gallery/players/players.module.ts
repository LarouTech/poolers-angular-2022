import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players.component';
import { PlayersRoutingModule } from './players-routing.module';
import { ScreenTitlePanelModule } from 'src/app/shared/components/screen-title-panel/screen-title-panel.module';
import { DefaultLayoutModule } from 'src/app/shared/components/default-layout/default-layout.module';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { PaginatorModule } from '../../shared/components/paginator/paginator.module';

@NgModule({
  declarations: [PlayersComponent],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    ScreenTitlePanelModule,
    DefaultLayoutModule,
    MatIconModule,
    PaginatorModule,
  ],
  exports: [PlayersComponent],
})
export class PlayersModule {}
