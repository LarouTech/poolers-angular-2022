import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby.component';
import { LobbyRoutingModule } from './lobby-routing.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';
import { ToolbarModule } from '../shared/components/toolbar/toolbar.module';
import { MyButtonModule } from '../shared/components/my-button/my-button.module';

@NgModule({
  declarations: [LobbyComponent],
  imports: [
    CommonModule,
    LobbyRoutingModule,
    PrimaryLayoutModule,
    ToolbarModule,
    MyButtonModule,
  ],
})
export class LobbyModule {}
