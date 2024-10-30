import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {

  isAuthenticated = input(false);

  onSignIn = output<void>(); // just to know when user want to login
  onSignOut = output<void>(); // just to know when user click on log-out

}
