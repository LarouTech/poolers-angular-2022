import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby.component';
import { LobbyRoutingModule } from './lobby-routing.module';
import { MyButtonModule } from '../shared/components/my-button/my-button.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { LoadingModalModule } from '../shared/components/loading-modal/loading-modal.module';
import { FooterComponent } from '../footer/footer.component';
import { FooterModule } from '../footer/footer.module';
import { DefaultLayoutModule } from '../shared/components/default-layout/default-layout.module';

@NgModule({
  declarations: [LobbyComponent],
  imports: [
    CommonModule,
    LobbyRoutingModule,
    MyButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    LoadingModalModule,
    FooterModule,
    DefaultLayoutModule,
  ],
})
export class LobbyModule {}
