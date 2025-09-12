import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { App } from './app/app'
import { routes } from './app/app.routes';
import { authInterceptor } from './app/services/auth.interceptor';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import localeDe from '@angular/common/locales/nl';

import { registerLocaleData } from '@angular/common';

registerLocaleData(localeDe);

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])),
      { provide: LOCALE_ID, useValue: 'nl-NL' },   
      { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }
  ]
});