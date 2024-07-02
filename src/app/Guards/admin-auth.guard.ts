import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication/authentication.service';
import { TokenValidationService } from '../Services/Authentication/token-validation.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let authService = inject(AuthenticationService);
  let tokenService = inject(TokenValidationService)

  if (
    !authService.getToken() != null ||
    !authService.hasRole('ADMIN') ||
    !tokenService.isValidToken(authService.getToken()) ||
    !tokenService.isTokenExpired(authService.getToken())
  ) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
