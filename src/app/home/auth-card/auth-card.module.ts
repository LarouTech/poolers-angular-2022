import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCardComponent } from './auth-card.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { ValidateFormComponent } from './validate-form/validate-form.component';
import { BottomNavigatorComponent } from './bottom-navigator/bottom-navigator.component';
import { MatIconModule } from '@angular/material/icon';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { InputfieldModule } from 'src/app/shared/components/inputfield/inputfield.module';
import { MyButtonModule } from 'src/app/shared/components/my-button/my-button.module';
import { OnMouseOverTabDirective } from './bottom-navigator/on-mouse-over-tab.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthCardRoutingModule } from './auth-card-routing.module';
import { AuthErrorToastComponent } from './auth-error-toast/auth-error-toast.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProfilePipeService } from './profile-pipe';

@NgModule({
  declarations: [
    AuthCardComponent,
    SigninFormComponent,
    ValidateFormComponent,
    BottomNavigatorComponent,
    OnMouseOverTabDirective,
    LoginFormComponent,
    AuthErrorToastComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CardModule,
    InputfieldModule,
    MyButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatRippleModule,
    AuthCardRoutingModule,
  ],
  providers: [ProfilePipeService],
  exports: [AuthCardComponent, BottomNavigatorComponent],
})
export class AuthCardModule {}
