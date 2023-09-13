import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from '@angular/core';
import { LocalDevTokenService } from '../services/local-dev-token.service';
import { switchMap } from 'rxjs';

export const localDevTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const service = inject(LocalDevTokenService);

  return service.localDevToken$.pipe(
    switchMap(token => {
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token.access_token}`
          }
        });
      }
      return next(request);
    })
  );
}
