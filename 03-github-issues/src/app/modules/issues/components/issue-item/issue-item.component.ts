import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { IssueService } from '../../services/issue.service';

import { GithubIssue, State } from '../../interfaces/github-issue.interface';

@Component({
  selector: 'app-issue-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './issue-item.component.html',
})
export class IssueItemComponent {
  issue = input.required<GithubIssue>();
  issueService = inject(IssueService);

  get isOpen() {
    return this.issue().state === State.Open;
  }

  prefetchData(): void {
    this.issueService.setIssueData(this.issue());
    // this.issueService.prefetchIssue(this.issue().number.toString());
  }
}
