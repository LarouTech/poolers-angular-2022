import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryLayoutComponent } from './primary-layout.component';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { MatIconModule } from '@angular/material/icon';
import { FooterModule } from '../footer/footer.module';
import { SideMenuListComponent } from './side-menu-list/side-menu-list.component';
import { OnOverMenuItemDirective } from './side-menu-list/side-menu-item-effect.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PrimaryLayoutComponent,
    SideMenuListComponent,
    OnOverMenuItemDirective,
  ],
  imports: [CommonModule, ToolbarModule, MatIconModule, FooterModule],
  exports: [PrimaryLayoutComponent],
})
export class PrimaryLayoutModule {}
