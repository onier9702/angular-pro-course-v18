import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageSelectorComponent } from "../../components/language-selector/language-selector.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    LanguageSelectorComponent,
  ],
  templateUrl: './products.component.html',
})
export default class ProductsComponent {

}
