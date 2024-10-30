import { Component, effect, Inject, inject, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

import { LanguageService, SERVER_LANG_TOKEN } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'i18n-app';

  cookie = inject(SsrCookieService);
  languageService = inject(LanguageService);

  constructor(
    // Now using custom injection token
    @Optional() // because the first time in server.ts file it has not passed
    @Inject(SERVER_LANG_TOKEN) langServer: string,
  ) {
    // before use custom injection token this cookie is empty on server side and for that reason exist the jump of english language and then switch to the current language
    // to solve this problem of get cookie empty on server node we will use custom injection token
    console.log({cookie: this.cookie.get('lang')});

    // Now using custom injection token
    console.log(langServer);

    const cookieLang = langServer ??
      (this.cookie.check('lang') ? this.cookie.get('lang') : 'en');
    // console.log({cookieLang});

    this.languageService.changeLang(cookieLang);
  }
}
