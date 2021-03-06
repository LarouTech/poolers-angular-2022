import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  CognitoIdentity,
  CognitoIdentityClient,
  GetIdCommandOutput,
} from '@aws-sdk/client-cognito-identity';
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandOutput,
  GetUserCommand,
  GetUserCommandOutput,
  GlobalSignOutCommand,
  GlobalSignOutCommandOutput,
  InitiateAuthCommand,
  InitiateAuthCommandOutput,
  InitiateAuthResponse,
  SignUpCommand,
  SignUpCommandOutput,
  UpdateUserAttributesCommand,
  UpdateUserAttributesCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import {
  BehaviorSubject,
  catchError,
  filter,
  from,
  lastValueFrom,
  mergeMap,
  Observable,
  of,
  pipe,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { environment } from 'src/environments/environment';

export interface SignupDto {
  email: string;
  birthdate: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  client!: CognitoIdentityProviderClient;
  _authLoading = new BehaviorSubject<boolean>(false);
  private _isAuth = new BehaviorSubject<boolean>(false);
  get isAuth$() {
    return this._isAuth.asObservable();
  }

  get authLoading$() {
    return this._authLoading.asObservable();
  }

  private _identityId = new BehaviorSubject<GetIdCommandOutput>(null!);

  get identityId(): GetIdCommandOutput {
    return this._identityId.getValue();
  }

  constructor(
    private router: Router,
    private configService: ConfigurationService
  ) {
    this.client = new CognitoIdentityProviderClient({
      region: environment.region,
    });
  }

  setAuthState(state: boolean) {
    this._isAuth.next(state);
  }

  stopLoadingSpinnerFromRouter(router: Router) {
    return router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      tap((res) => {
        this._authLoading.next(false);
      })
    );
  }

  //GET COGNITO CREDENTIALS
  getCognitoCredentials() {
    return fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: environment.region }),
      identityPoolId: this.configService.config.cognito.identityPoolId,
      logins: {
        [`cognito-idp.${environment.region}.amazonaws.com/${this.configService.config.cognito.userPoolId}`]:
          localStorage.getItem('IdToken')!,
      },
    });
  }

  //GET COGNITO IDENTITY ID
  getIdentityId(): Observable<GetIdCommandOutput> {
    const client = new CognitoIdentity({
      region: environment.region,
      credentials: this.getCognitoCredentials(),
    });

    return from(
      client.getId({
        IdentityPoolId: this.configService.config.cognito.identityPoolId,
        Logins: {
          [`cognito-idp.${environment.region}.amazonaws.com/${this.configService.config.cognito.userPoolId}`]:
            localStorage.getItem('IdToken')!,
        },
      })
    ).pipe(
      tap((data) => console.log(data)),
      tap((data) => this._identityId.next(data))
    );
  }

  //CONGITO SIGNUP USER
  signUp(signupDto: SignupDto): Observable<SignUpCommandOutput> {
    console.log(signupDto);

    const command$ = of(
      new SignUpCommand({
        ClientId: this.configService.config.cognito.userPoolClientId,
        Password: signupDto.password,
        Username: signupDto.email,
        UserAttributes: [
          {
            Name: 'email',
            Value: signupDto.email,
          },
          {
            Name: 'birthdate',
            Value: signupDto.birthdate,
          },
          {
            Name: 'nickname',
            Value: signupDto.username,
          },
        ],
      })
    );

    return command$.pipe(
      mergeMap((command) => {
        return from(this.client.send(command));
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message).message);
      })
    );
  }

  //COGNITO CONFIRM SIGNUP
  confirmSignUp(
    email: string,
    code: string
  ): Observable<ConfirmSignUpCommandOutput> {
    const command$ = of(
      new ConfirmSignUpCommand({
        ClientId: this.configService.config.cognito.userPoolClientId,
        Username: email,
        ForceAliasCreation: true,
        ConfirmationCode: code,
      })
    );

    return command$.pipe(
      mergeMap((command) => {
        return from(this.client.send(command)).pipe();
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message).message);
      })
    );
  }

  //COGNITO LOGIN
  login(
    email: string,
    password: string
  ): Observable<InitiateAuthCommandOutput> {
    // this._authLoading.next(true);
    const command$ = of(
      new InitiateAuthCommand({
        ClientId: this.configService.config.cognito.userPoolClientId,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })
    );

    return command$.pipe(
      mergeMap((command) => {
        return from(this.client.send(command));
      }),
      tap((res) => this.saveTokensToLocalStorage(res)),
      catchError((error) => {
        // this._authLoading.next(false);
        return throwError(() => new Error(error.message).message);
      })
    );
  }

  //COGNITO GLOBAL SIGN OUT
  logout(): Observable<GlobalSignOutCommandOutput> {
    const client = new CognitoIdentityProviderClient({
      region: environment.region,
      credentials: this.getCognitoCredentials(),
    });

    if (!localStorage.length) {
      this.router.navigate(['']);
      return of();
    }

    const command$ = of(
      new GlobalSignOutCommand({
        AccessToken: localStorage.getItem('AccessToken')!,
      })
    );

    return command$.pipe(
      mergeMap((command) => {
        return from(client.send(command));
      }),
      tap((res) => this.removeTokensFromLocalStorage()),
      tap(() => this.router.navigate([''])),
      catchError((error) => {
        this.router.navigate(['']);
        return throwError(() => new Error(error.message).message);
      })
    );
  }

  //GET COGNITO USER FROM ACCESS TOKEN
  getUser(): Observable<GetUserCommandOutput> {
    const accessToken = localStorage.getItem('AccessToken')!;

    if (!accessToken) {
      return of();
    }

    const command$ = of(
      new GetUserCommand({
        AccessToken: accessToken,
      })
    );

    return command$.pipe(
      mergeMap((command) => {
        return from(this.client.send(command));
      })
    );
  }

  //UPDATE USER ATTRIBUTES
  UpdateUserAttributes(
    profileId: string
  ): Observable<UpdateUserAttributesCommandOutput> {
    const command$ = of(
      new UpdateUserAttributesCommand({
        AccessToken: localStorage.getItem('AccessToken')!,
        UserAttributes: [
          {
            Name: 'custom:profileId',
            Value: profileId,
          },
        ],
      })
    );

    return command$.pipe(
      switchMap((command) => {
        return from(this.client.send(command));
      })
    );
  }

  //SAVE InitiateAuthCommandOutput TO LOCALSTORAGE
  private saveTokensToLocalStorage(data: InitiateAuthResponse): void {
    this._isAuth.next(true);
    localStorage.setItem(
      'AccessToken',
      data.AuthenticationResult?.AccessToken!
    );
    localStorage.setItem('IdToken', data.AuthenticationResult?.IdToken!);
    localStorage.setItem(
      'RefreshToken',
      JSON.stringify(data.AuthenticationResult?.RefreshToken!)
    );
    localStorage.setItem(
      'TokenType',
      JSON.stringify(data.AuthenticationResult?.TokenType!)
    );
  }

  //REMOVE InitiateAuthCommandOutput TO LOCALSTORAGE
  private removeTokensFromLocalStorage() {
    this._isAuth.next(false);
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('IdToken');
    localStorage.removeItem('RefreshToken');
    localStorage.removeItem('TokenType');
  }

  //VALIDATE IF JWT TOKEN IS EXPIRED OR NOT
  validateTokenExpiration(token: string): boolean {
    if (!token) {
      return false;
    }

    const decoded: JwtPayload = jwt_decode(token);
    const tokenExpiration = decoded.exp;
    const now = Math.round(Date.now() / 1000);

    if (tokenExpiration! > now) {
      return true;
    } else {
      return false;
    }
  }
}
