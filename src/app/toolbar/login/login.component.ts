import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  lastValueFrom,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { InputAutoCompleteTypes } from 'src/app/shared/components/inputfield/input-emun';
import { AuthService } from '../auth/auth.service';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  emailAutocomplete = InputAutoCompleteTypes.EMAIL;
  passwordAutocomplete = InputAutoCompleteTypes.CUREENT_PASSWORD;
  private _errorMessage = new BehaviorSubject<string>(null!);

  get errorMessage$(): Observable<string> {
    return this._errorMessage.asObservable();
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginFormConstructor();
  }

  loginFormConstructor() {
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
    lastValueFrom(
      this.authService
        .login(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
        )
        .pipe(
          tap(() => {
            this.loginForm.reset();
            this.router.navigate(['lobby']);
          }),
          catchError((error) => {
            this._errorMessage.next(error);
            return of(error);
          })
        )
    );
  }

  onClearErrorHandler(state: boolean) {
    this._errorMessage.next(null!);
  }
}
