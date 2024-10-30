import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export enum TitleColor{
  red = 'text-red-500',
  green = 'text-green-500',
  blue = 'text-blue-500',
  purple = 'text-purple-500',
}

@Component({
  selector: 'lib-apx-aside-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './apx-aside-menu.component.html',
  styles: ``
})
export class ApxAsideMenuComponent {
  isAuthenticated = input(false);
  title = input('APX');
  subtitle = input('Corp');

  onSignIn = output<void>(); // just to know when user want to login
  onSignOut = output<void>(); // just to know when user click on log-out

  titleColor = input<TitleColor>(TitleColor.purple);
}
