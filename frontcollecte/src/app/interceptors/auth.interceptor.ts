import { HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isBrowser = typeof window !== 'undefined';
  const token = isBrowser ? localStorage.getItem('token') : null;

  let authReq = req.clone({
    setHeaders: {
      'Accept': 'application/json',
    }
  });

  if (token) {
    authReq = authReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(authReq);

};
