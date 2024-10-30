import { inject, Injectable, InjectionToken, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

// Custom injection token to solve problem of empty cookie on server side
export const SERVER_LANG_TOKEN = new InjectionToken<string>('SERVER_LANG_TOKEN');


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  cookie = inject(SsrCookieService);
  translateService = inject(TranslateService);

  // Another way to get the custom server lang injection token
  langServer = inject(SERVER_LANG_TOKEN, {
    optional: true,
  });
  currentLang = signal<string>(this.langServer ?? 'en');

  changeLang(lang: string) {
    this.cookie.set('lang', lang);

    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);

    this.currentLang.set(lang);
    // TODO: change the language
  }
}
