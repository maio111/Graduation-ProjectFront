import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { TokenValidationService } from '../Services/Authentication/token-validation.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let authService = inject(AuthenticationService);
  let tokenService = inject(TokenValidationService);
  let token = tokenService.getToken();
  if (!token || !tokenService.isValidToken(token) || tokenService.isTokenExpired(token)) {
    router.navigate(['/login']);
    return false;
  }
  if (!authService.hasRole('ADMIN')) {
    router.navigate(['/notFound']); // or any unauthorized route
    return false;
  }

  return true;
};