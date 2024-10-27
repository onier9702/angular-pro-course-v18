import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';

import { IssueService } from '../../services/issue.service';

import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';

@Component({
  selector: 'app-issue',
  standalone: true,
  imports: [
    RouterLink,
    IssueCommentComponent,
  ],
  templateUrl: './issue.component.html'
})
export default class IssueComponent {

  private route = inject(ActivatedRoute);
  private issueService = inject(IssueService);

  public issueNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map(params => params.get('number') ?? ''),
      tap(issueId => this.issueService.setIssueNumber(issueId)),
    )
  );

  public issueQuery = this.issueService.issueByNumberQuery;
  public issueCommentsQuery = this.issueService.issueCommentsQuery;
}
