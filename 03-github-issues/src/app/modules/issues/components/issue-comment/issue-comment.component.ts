import { Component, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { GithubIssue } from '../../interfaces/github-issue.interface';

@Component({
  selector: 'app-issue-comment',
  standalone: true,
  imports: [
    MarkdownModule,
  ],
  templateUrl: './issue-comment.component.html',
})
export class IssueCommentComponent {

  issue = input.required<GithubIssue>();

}
