import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ErrorService } from '../services/error.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const service = inject(ErrorService);
  return next(request).pipe(
    catchError((portalError: HttpErrorResponse) => {
      // if portalError.error.error exists, this error is none of our caught errors.
      if (!portalError.error.error) {
        service.newError(portalError.error, true);
      } else {
        service.newError({
            affectedService: 'Portal',
            code: portalError.status.toString(),
            technicalDescription: portalError.message,
            timeOfOccurrence: portalError.error.timestamp,
            userAccount: '',
            verboseDescription: portalError.statusText
          }, true
        );
      }

      return throwError(() => portalError);
    })
  );
};
