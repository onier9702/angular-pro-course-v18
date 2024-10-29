import { Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';

import { getIssueByNumber } from '../actions/get-issue-by-number';
import { getComments } from '../actions/get-comments';
import { GithubIssue } from '../interfaces/github-issue.interface';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueNumber = signal<string|null>(null);
  private queryClient = injectQueryClient();

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

  public prefetchIssue(issueId: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueByNumber(issueId),
      staleTime: 1000 * 60 * 5, // minutes
    });
  }

  public setIssueData(issue: GithubIssue) {
    this.queryClient.setQueryData(
      ['issue', issue.number.toString()],
      issue,
    )
  }

}
