import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDetailsComponent } from './game-details.component';
import { GameDetailsRoutingModule } from './game-details-routing.module';
import { PrimaryLayoutModule } from 'src/app/shared/components/primary-layout/primary-layout.module';
import { MyButtonModule } from 'src/app/shared/components/my-button/my-button.module';
import { GameDetailsLayoutComponent } from './game-details-layout/game-details-layout.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { GameDetailsHeaderComponent } from './game-details-header/game-details-header.component';

@NgModule({
  declarations: [GameDetailsComponent, GameDetailsLayoutComponent, GameDetailsHeaderComponent],
  imports: [
    CommonModule,
    GameDetailsRoutingModule,
    PrimaryLayoutModule,
    MyButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  exports: [GameDetailsComponent],
})
export class GameDetailsModule {}
