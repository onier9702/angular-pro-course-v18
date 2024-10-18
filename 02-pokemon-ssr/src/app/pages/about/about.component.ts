import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {

    if (isPlatformBrowser(this.platform)) {
      // Execute some code you need in the browser side (client side)
    }

    if (isPlatformServer(this.platform)) {
      // Execute some code you need in the server side (server side)
    }

    this.title.setTitle('About');
    this.meta.updateTag({ name: 'Description', content: 'This is the about page' });
    this.meta.updateTag({ name: 'og:title', content: 'About Page' });
    this.meta.updateTag({ name: 'keywords', content: 'About, NameApplication, All you need to set as a keyword' });
  }

}
