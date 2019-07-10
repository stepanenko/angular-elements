import { BrowserModule } from '@angular/platform-browser';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AlertComponent } from './alert.component';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    BrowserModule
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [AlertComponent],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const ngElement = createCustomElement(AlertComponent, {
      injector: this.injector
    });

    customElements.define('my-alert', ngElement);
  }
}
