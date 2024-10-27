import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  get isOpen() {
    return this.issue().state === State.Open;
  }
}
