import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  lastValueFrom,
  Observable,
  of,
  tap,
} from 'rxjs';
import { InputAutoCompleteTypes } from 'src/app/shared/components/inputfield/input-emun';
import { AuthService, SignupDto } from '../auth/auth.service';

import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signinForm!: FormGroup;
  emailAutocomplete = InputAutoCompleteTypes.EMAIL;
  passwordAutocomplete = InputAutoCompleteTypes.CUREENT_PASSWORD;
  @Output('signupDtoEmitter') signupDtoEmitter = new EventEmitter<SignupDto>(
    null!
  );
  private _errorMessage = new BehaviorSubject<string>(null!);

  get errorMessage$(): Observable<string> {
    return this._errorMessage.asObservable();
  }

  constructor(
    private authService: AuthService,
    private toolbarService: ToolbarService
  ) {}

  ngOnInit(): void {
    this.signinFormConstructor();
  }

  signinFormConstructor() {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(18),
      ]),
      birthdate: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
    });
  }

  onSigninHandler() {
    const signupDto: SignupDto = {
      email: this.signinForm.get('email')?.value,
      password: this.signinForm.get('password')?.value,
      birthdate: this.signinForm.get('birthdate')?.value,
      username: this.signinForm.get('username')?.value,
    };

    lastValueFrom(
      this.authService.signUp(signupDto).pipe(
        tap(() => {
          this.toolbarService.setSigninMenuState(false);
          this.toolbarService.setValidateState(true);
          this.signupDtoEmitter.emit(signupDto);
        }),
        catchError((err) => {
          this.toolbarService.setValidateState(false);
          this._errorMessage.next(err);
          return of(err);
        })
      )
    );
  }

  onClearErrorHandler(state: boolean) {
    this._errorMessage.next(null!);
  }
}
