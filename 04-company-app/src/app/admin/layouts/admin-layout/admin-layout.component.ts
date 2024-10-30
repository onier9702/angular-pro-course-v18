import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// THIS IS OUR PACKAGE CREATED AND UPLOADED TO NPM
import { ApxAsideMenuComponent, TitleColor } from 'apx-aside-menu';

// No more to use so we create a npm package in the cloud
// import { SideMenuComponent } from '../../../shared/side-menu/side-menu.component';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    ApxAsideMenuComponent,
],
  templateUrl: './admin-layout.component.html',
})
export default class AdminLayoutComponent {

  isAuthenticated = signal(false);
  TitleColor = TitleColor;

  onLogin(): void {
    this.isAuthenticated.set(true);
  }

  onLogout(): void {
    this.isAuthenticated.set(false);
  }
}
