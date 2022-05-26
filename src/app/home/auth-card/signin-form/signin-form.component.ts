import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { BehaviorSubject, catchError, lastValueFrom, of, tap } from 'rxjs';
import { InputAutoCompleteTypes } from 'src/app/shared/components/inputfield/input-emun';
import { AuthService } from '../auth.service';
import { BottomNavigatorService } from '../bottom-navigator/bottom-navigator.service';

@Component({
  selector: 'signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
})
export class SigninFormComponent implements OnInit {
  signinForm: FormGroup = undefined!;
  emailAutocomplete = InputAutoCompleteTypes.EMAIL;
  passwordAutocomplete = InputAutoCompleteTypes.CUREENT_PASSWORD;
  _error = new BehaviorSubject<string>(null!);

  @Output() cacheValues = new EventEmitter<{ email: string; password: string }>(
    null!
  );

  get error() {
    return this._error.asObservable();
  }

  constructor(
    private tabService: BottomNavigatorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signinFormConstructor();
  }

  onClearErrorHanlder(event: boolean) {
    this._error.next(null!);
  }

  signinFormConstructor() {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(18),
      ]),
    });
  }

  onSigninHandler(): Promise<SignUpCommandOutput> {
    const command$ = this.authService
      .signUp(
        this.signinForm.get('email')?.value,
        this.signinForm.get('password')?.value
      )
      .pipe(
        tap(() => this.tabService._isValidate.next(true)),
        tap(() =>
          this.cacheValues.emit({
            email: this.signinForm.get('email')?.value,
            password: this.signinForm.get('password')?.value,
          })
        ),
        catchError((error) => {
          this._error.next(error);
          return of();
        })
      );

    return lastValueFrom(command$).catch((error) => {
      return null!;
    });
  }
}
