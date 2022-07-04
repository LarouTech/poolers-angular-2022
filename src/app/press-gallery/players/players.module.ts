import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players.component';
import { PlayersRoutingModule } from './players-routing.module';
import { ScreenTitlePanelModule } from 'src/app/shared/components/screen-title-panel/screen-title-panel.module';
import { DefaultLayoutModule } from 'src/app/shared/components/default-layout/default-layout.module';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorModule } from '../../shared/components/paginator/paginator.module';
import { PlayerTableComponent } from './player-table/player-table.component';
import { SeasonPickerModule } from 'src/app/shared/components/season-picker/season-picker.module';
import { PlayerSorterComponent } from './player-sorter/player-sorter.component';
import { InputfieldModule } from 'src/app/shared/components/inputfield/inputfield.module';
import { PlayerFiltersComponent } from './player-filters/player-filters.component';
import { MyButtonModule } from 'src/app/shared/components/my-button/my-button.module';
import { PlayerDetailsComponent } from './player-details/player-details.component';

@NgModule({
  declarations: [
    PlayersComponent,
    PlayerTableComponent,
    PlayerSorterComponent,
    PlayerFiltersComponent,
    PlayerDetailsComponent,
  ],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    ScreenTitlePanelModule,
    DefaultLayoutModule,
    MatIconModule,
    PaginatorModule,
    SeasonPickerModule,
    InputfieldModule,
    MyButtonModule,
  ],
  exports: [PlayersComponent],
})
export class PlayersModule {}
