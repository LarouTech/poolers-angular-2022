import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmSignUpCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import {
  BehaviorSubject,
  catchError,
  lastValueFrom,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { InputAutoCompleteTypes } from 'src/app/shared/components/inputfield/input-emun';
import { AuthService } from '../auth.service';
import { AuthCardTabType } from '../bottom-navigator/bottom-navigator.component';
import { BottomNavigatorService } from '../bottom-navigator/bottom-navigator.service';
import { ProfilePipeService } from '../profile-pipe';

@Component({
  selector: 'validate-form',
  templateUrl: './validate-form.component.html',
  styleUrls: ['./validate-form.component.scss'],
})
export class ValidateFormComponent implements OnInit {
  @Input('cacheValues') cacheValues!: { email: string; password: string };
  validateForm: FormGroup = undefined!;
  emailAutocomplete = InputAutoCompleteTypes.EMAIL;
  _error = new BehaviorSubject<string>(null!);

  get error() {
    return this._error.asObservable();
  }

  constructor(
    private profilePipe: ProfilePipeService,
    private router: Router,
    private tabService: BottomNavigatorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.validateFormConstructor();
  }

  onClearErrorHanlder(event: boolean) {
    this._error.next(null!);
  }

  validateFormConstructor() {
    this.validateForm = new FormGroup({
      email: new FormControl(
        {
          value: this.cacheValues ? this.cacheValues.email : null,
          disabled: true,
        },
        [Validators.required, Validators.email]
      ),
      code: new FormControl(null),
    });
  }

  onValidateHandler(): Promise<ConfirmSignUpCommandOutput | unknown> {
    console.log(this.validateForm);
    const command$ = this.authService
      .confirmSignUp(
        this.validateForm.get('email')?.value,
        this.validateForm.get('code')?.value
      )
      .pipe(
        tap(() => this.tabService._currentTab.next(AuthCardTabType.LOGIN)),
        tap(() => this.tabService._isValidate.next(false)),
        mergeMap(() => {
          return this.authService
            .login(this.cacheValues.email, this.cacheValues.password)
            .pipe(
              this.profilePipe.profileRxjsPipe(),
              tap(() => this.router.navigate(['lobby'])),
              catchError((error) => {
                this._error.next(error);
                return of();
              })
            );
        }),
        catchError((error) => {
          this._error.next(error);
          return of();
        })
      );

    return lastValueFrom(command$).catch(() => {
      return null!;
    });
  }
}
