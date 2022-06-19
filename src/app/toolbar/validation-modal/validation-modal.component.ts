import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, Observable, switchMap, tap } from 'rxjs';
import { AuthService, SignupDto } from '../auth/auth.service';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'validation-modal',
  templateUrl: './validation-modal.component.html',
  styleUrls: ['./validation-modal.component.scss'],
})
export class ValidationModalComponent implements OnInit {
  state$!: Observable<boolean>;
  @Input('signupDto') signupDto$!: Observable<SignupDto>;
  validateForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toolbarService: ToolbarService
  ) {}

  ngOnInit(): void {
    this.state$ = this.toolbarService.validateState$;
  }

  ngAfterViewInit(): void {
    this.validateFormConstructor();
  }

  validateFormConstructor() {
    const form$ = this.signupDto$.pipe(
      tap((dto) => {
        this.validateForm = new FormGroup({
          email: new FormControl(
            { value: dto ? dto.email : null, disabled: true },
            [Validators.required, Validators.email]
          ),
          code: new FormControl(null, [Validators.required]),
        });
      })
    );

    lastValueFrom(form$);
  }

  onCancelValidation() {
    this.toolbarService.setValidateState(false);
  }

  onValidate() {
    const onValidate$ = this.authService
      .confirmSignUp(
        this.validateForm.get('email')?.value,
        this.validateForm.get('code')?.value
      )
      .pipe(
        switchMap(() => {
          return this.signupDto$.pipe(
            switchMap((dto) => {
              return this.authService.login(dto.email, dto.password);
            })
          );
        }),
        tap(() => {
          this.toolbarService.setValidateState(false);
          this.router.navigate(['lobby']);
        })
      );

    lastValueFrom(onValidate$);
  }
}
