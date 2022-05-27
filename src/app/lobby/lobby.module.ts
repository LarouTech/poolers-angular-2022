import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby.component';
import { LobbyRoutingModule } from './lobby-routing.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';
import { ToolbarModule } from '../shared/components/toolbar/toolbar.module';
import { MyButtonModule } from '../shared/components/my-button/my-button.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [LobbyComponent, DashboardComponent],
  imports: [
    CommonModule,
    LobbyRoutingModule,
    PrimaryLayoutModule,
    ToolbarModule,
    MyButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
})
export class LobbyModule {}
