import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubLabel } from '../../interfaces/github-label.interface';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'app-issues-labels-selector',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './issues-labels-selector.component.html',
})
export class IssuesLabelsSelectorComponent {
  labels = input.required<GithubLabel[]>();
  issuesService = inject(IssuesService);

  isLabelSelected(label: string): boolean {
    return this.issuesService.selectedLabels().has(label);
  }

  onToggleLabel(label: string) {
    this.issuesService.toggleLabel(label);
  }
}
