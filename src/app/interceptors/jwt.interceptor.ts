import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt/jwt.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  
  // Clone the request and set the 'Authorization' header with the JWT from `JwtService`.
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${ jwtService.jwt }`),
  });
  
  return next(authReq);
};
