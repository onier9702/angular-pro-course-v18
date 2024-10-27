import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { getIssueByNumber } from '../actions/get-issue-by-number';
import { getComments } from '../actions/get-comments';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueNumber = signal<string|null>(null);

  public issueByNumberQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  public issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getComments(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  setIssueNumber(issueId: string) {
    this.issueNumber.set(issueId);
  }

}
