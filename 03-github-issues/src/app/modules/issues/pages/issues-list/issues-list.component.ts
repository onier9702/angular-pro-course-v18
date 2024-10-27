import { Component, inject } from '@angular/core';

import { IssuesService } from '../../services/issues.service';

import { IssuesLabelsSelectorComponent } from '../../components/issues-labels-selector/issues-labels-selector.component';
import { IssueItemComponent } from "../../components/issue-item/issue-item.component";


@Component({
  selector: 'app-issues-list',
  standalone: true,
  imports: [
    IssuesLabelsSelectorComponent,
    IssueItemComponent,
],
  templateUrl: './issues-list.component.html'
})
export default class IssuesListComponent {

  issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }

  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }

}
