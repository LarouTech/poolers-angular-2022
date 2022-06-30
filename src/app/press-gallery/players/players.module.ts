import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players.component';
import { PlayersRoutingModule } from './players-routing.module';
import { ScreenTitlePanelModule } from 'src/app/shared/components/screen-title-panel/screen-title-panel.module';
import { DefaultLayoutModule } from 'src/app/shared/components/default-layout/default-layout.module';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [PlayersComponent, PaginatorComponent],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    ScreenTitlePanelModule,
    DefaultLayoutModule,
    MatIconModule,
  ],
  exports: [PlayersComponent],
})
export class PlayersModule {}
