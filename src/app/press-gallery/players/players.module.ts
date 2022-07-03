import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players.component';
import { PlayersRoutingModule } from './players-routing.module';
import { ScreenTitlePanelModule } from 'src/app/shared/components/screen-title-panel/screen-title-panel.module';
import { DefaultLayoutModule } from 'src/app/shared/components/default-layout/default-layout.module';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { PaginatorModule } from '../../shared/components/paginator/paginator.module';
import { PlayerTableComponent } from './player-table/player-table.component';
import { SeasonPickerComponent } from 'src/app/shared/components/season-picker/season-picker.component';
import { SeasonPickerModule } from 'src/app/shared/components/season-picker/season-picker.module';

@NgModule({
  declarations: [PlayersComponent, PlayerTableComponent],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    ScreenTitlePanelModule,
    DefaultLayoutModule,
    MatIconModule,
    PaginatorModule,
    SeasonPickerModule,
  ],
  exports: [PlayersComponent],
})
export class PlayersModule {}
