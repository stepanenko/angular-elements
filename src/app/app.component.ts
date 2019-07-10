import { Component, Injector } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AlertComponent } from './alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  content = null;

  constructor(private injector: Injector, private domSanitizer: DomSanitizer) {
    const el = createCustomElement(AlertComponent, { injector: this.injector });
    customElements.define('my-alert', el);

    setTimeout(() => {
      this.content = this.domSanitizer.bypassSecurityTrustHtml('<my-alert message="Rendered Dynamically"></my-alert>');
    }, 1000);
  }
}
