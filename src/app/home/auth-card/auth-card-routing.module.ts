import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthCardComponent } from './auth-card.component';
import { SigninFormComponent } from './signin-form/signin-form.component';

const routes: Routes = [];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthCardRoutingModule {}
