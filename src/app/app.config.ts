import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAppCheck, initializeAppCheck, ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';

export function appCheckFactory() {
  return initializeAppCheck(undefined, {
    provider: new ReCaptchaEnterpriseProvider('6LeDaAcrAAAAAN3bQx6elCmM_eQEZ7mf276pe27v'),
    isTokenAutoRefreshEnabled: true,
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAppCheck(appCheckFactory),
  ]
};