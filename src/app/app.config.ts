import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
<<<<<<< HEAD
=======
import { provideHttpClient } from '@angular/common/http';
>>>>>>> 7083f9023aad2c9e752a09b5ff05907c13215893
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
<<<<<<< HEAD
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideHttpClient()]
=======
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),provideHttpClient()]
>>>>>>> 7083f9023aad2c9e752a09b5ff05907c13215893
};
