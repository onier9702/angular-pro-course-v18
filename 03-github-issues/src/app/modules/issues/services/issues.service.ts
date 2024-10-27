import { Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { getLabels } from '../actions/get-labels';
import { getIssues } from '../actions/get-issues';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  public labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  public issuesQuery = injectQuery(() => ({
    queryKey: ['issues'],
    queryFn: () => getIssues(),
  }));

}
