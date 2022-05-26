import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ToolbarModule } from '../shared/components/toolbar/toolbar.module';
import { AuthCardComponent } from './auth-card/auth-card.component';
import { MatIconModule } from '@angular/material/icon';
import { CardModule } from '../shared/components/card/card.module';
import { InputfieldModule } from '../shared/components/inputfield/inputfield.module';
import { MyButtonModule } from '../shared/components/my-button/my-button.module';
import { BottomNavigatorComponent } from './auth-card/bottom-navigator/bottom-navigator.component';
import { LoginFormComponent } from './auth-card/login-form/login-form.component';
import { SigninFormComponent } from './auth-card/signin-form/signin-form.component';
import { ValidateFormComponent } from './auth-card/validate-form/validate-form.component';
import { AuthCardModule } from './auth-card/auth-card.module';
import { PrimaryLayoutModule } from '../shared/components/primary-layout/primary-layout.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ToolbarModule,
    AuthCardModule,
    PrimaryLayoutModule,
  ],
})
export class HomeModule {}
