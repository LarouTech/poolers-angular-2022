import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem(`AccessToken`);
    const idToken = localStorage.getItem('IdToken');

    if (accessToken) {
      request = request.clone({
        headers: request.headers.set('authorization', accessToken),
      });
    }

    if (idToken) {
      request = request.clone({
        headers: request.headers.set('authorizer', idToken),
      });
    }

    return next.handle(request);
  }
}
