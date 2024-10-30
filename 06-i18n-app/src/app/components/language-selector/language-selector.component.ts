import { Component, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
  languageService = inject(LanguageService);
  currentLang = this.languageService.currentLang;

  languages = signal([
    { code: 'en', flag: '🇺🇸' },
    { code: 'es', flag: '🇪🇸' },
  ]);

  onChangeLanguage(event: Event) {
    const target = event.target as HTMLInputElement;
    const language = target.value;

    this.languageService.changeLang(language);
  }
}
