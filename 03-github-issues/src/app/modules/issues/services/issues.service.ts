import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { getLabels } from '../actions/get-labels';
import { getIssues } from '../actions/get-issues';
import { State } from '../interfaces/github-issue.interface';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  selectedState = signal<State>(State.All);
  selectedLabels = signal(new Set<string>());

  public labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  // public issuesQuery = injectQuery(() => ({
  //   queryKey: ['issues', this.selectedState()],
  //   queryFn: () => getIssues(this.selectedState()),
  // }));

  // here the objective is to pass labels as query params as well as state and the order does not matter
  public issuesQuery = injectQuery(() => ({
    queryKey: ['issues', {
      state: this.selectedState(),
      selectedLabels: [...this.selectedLabels()],
    }],
    queryFn: () => getIssues(this.selectedState(), [...this.selectedLabels()]),
  }));

  showIssuesByState(state: State) {
    this.selectedState.set(state);
  }

  toggleLabel(label: string) {
    const labels = this.selectedLabels();

    if (labels.has(label)) {
      labels.delete(label);
    } else {
      labels.add(label);
    }

    this.selectedLabels.set(new Set(labels));
  }

}
