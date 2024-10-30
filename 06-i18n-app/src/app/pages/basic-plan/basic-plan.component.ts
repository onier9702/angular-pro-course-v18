import { Component } from '@angular/core';

import { LanguageSelectorComponent } from "../../components/language-selector/language-selector.component";

@Component({
  selector: 'app-basic-plan',
  standalone: true,
  imports: [LanguageSelectorComponent],
  templateUrl: './basic-plan.component.html',
})
export default class BasicPlanComponent {

}
