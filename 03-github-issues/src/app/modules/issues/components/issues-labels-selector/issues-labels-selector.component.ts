import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubLabel } from '../../interfaces/github-label.interface';

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
}
