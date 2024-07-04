import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JwtInterceptor } from './Interceptors/jwt-interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { BsModalService } from 'ngx-bootstrap/modal';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,
      multi: true,
    },
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    BsModalService
  ]
};
