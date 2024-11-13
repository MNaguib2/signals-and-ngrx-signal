import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';

// ... previous code remains the same
export class AppTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`../assets/i18n/${lang}.json`));
  }
}

// ... the rest of the component

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
        useClass: AppTranslateLoader,
      }
  }))
  ]
};
