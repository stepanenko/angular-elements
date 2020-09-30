
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AlertComponent } from './alert.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HelloWorldComponent
  ],
  imports: [
    BrowserModule
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [AlertComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const ngElement = createCustomElement(AlertComponent, {
      injector: this.injector
    });

    customElements.define('my-alert', ngElement);
  }
}
