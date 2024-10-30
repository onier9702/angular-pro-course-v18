import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ApxAsideMenuComponent, TitleColor } from "apx-aside-menu";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ApxAsideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'apx-testbed-app';

  isAuthenticated = signal(false);

  TitleColor = TitleColor;
}
