import { Component, computed, inject, signal } from '@angular/core';

import { IssuesService } from '../../services/issues.service';

import { IssuesLabelsSelectorComponent } from '../../components/issues-labels-selector/issues-labels-selector.component';
import { IssueItemComponent } from "../../components/issue-item/issue-item.component";
import { State } from '../../interfaces/github-issue.interface';


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
  currentState = computed(() => this.issuesService.selectedState());

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }

  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }

  onChangeState(newState: string) {
    const state = {
      'all': State.All,
      'open': State.Open,
      'closed': State.Closed,
    }[newState] ?? State.All;

    this.issuesService.showIssuesByState(state);
  }

}
