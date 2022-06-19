import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MatIconModule } from '@angular/material/icon';

import { OnHoverItemDirective } from './on-hover-item.directive';
import { OnHoverControlDirective } from './on-hover-control.directive';
import { TollbarControlsComponent } from './toolbar-controls/toolbar-controls.component';
import { ToolbarMenuComponent } from './toolbar-menu/toolbar-menu.component';
import { HamburgerMouseDirective } from './hamburger/hamburger-mouse.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationModalComponent } from './validation-modal/validation-modal.component';
import { ToolbarService } from './toolbar.service';
import { AuthErrorToastComponent } from './auth/auth-error-toast/auth-error-toast.component';
import { InputfieldModule } from '../shared/components/inputfield/inputfield.module';
import { MyButtonModule } from '../shared/components/my-button/my-button.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HamburgerComponent } from './hamburger/hamburger.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    LoginComponent,
    OnHoverItemDirective,
    OnHoverControlDirective,
    TollbarControlsComponent,
    ToolbarMenuComponent,
    SignupComponent,
    HamburgerComponent,
    HamburgerMouseDirective,
    ValidationModalComponent,
    AuthErrorToastComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    InputfieldModule,
    MyButtonModule,
    ReactiveFormsModule,
  ],
  providers: [ToolbarService],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
