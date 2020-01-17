import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Errors } from '../models/errors';

@Injectable()
export class ApiErrorsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(this.handleError)
    );
  }

  handleError(httpErrorResponse: HttpErrorResponse) {
    const errors = httpErrorResponse.error.errors as Error[];

    const fields = {};
    const common = [];

    errors.forEach((error: any) => {
      if (error.target === 'common') {
        common.push(error.message);
      } else {
        fields[error.source.field] = error.message;
      }
    });

    return throwError(new Errors(common, fields));
  }
}
