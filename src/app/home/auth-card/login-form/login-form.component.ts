import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, lastValueFrom, of, tap } from 'rxjs';
import { InputAutoCompleteTypes } from 'src/app/shared/components/inputfield/input-emun';
import { AuthService } from '../auth.service';

import { ProfilePipeService } from '../../auth-card/profile-pipe';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup = undefined!;
  emailAutocomplete = InputAutoCompleteTypes.EMAIL;
  passwordAutocomplete = InputAutoCompleteTypes.CUREENT_PASSWORD;
  _error = new BehaviorSubject<string>(null!);

  get error() {
    return this._error.asObservable();
  }

  constructor(
    private profilePipe: ProfilePipeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signinFormConstructor();
  }

  onClearErrorHanlder(event: boolean) {
    this._error.next(null!);
  }

  signinFormConstructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(18),
      ]),
    });
  }

  onLoginHandler() {
    const command$ = this.authService
      .login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .pipe(
        this.profilePipe.profileRxjsPipe(),
        tap(() => this.router.navigate(['lobby'])),
        catchError((error) => {
          this._error.next(error);
          return of();
        })
      );

    return lastValueFrom(command$).catch((error) => {
      return null;
    });
  }
}
