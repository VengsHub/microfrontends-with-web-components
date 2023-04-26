import { ApplicationRef, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
import { createCustomElement } from '@angular/elements';
import { Example2Component } from './example2/example2.component';
import { SubExampleComponent } from './example/sub-example/sub-example.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    Example2Component,
    SubExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] // TODO do I need to remove this or not? does it interfere with ng build?
})
export class AppModule {
  constructor(private injector: Injector) {
    // TODO put custom element definitions in constructor or ngDoBootstrap?
    const example = createCustomElement(ExampleComponent, {injector: this.injector});
    customElements.define('wc-example', example);

    // ONLY CONVERT TOP LEVEL COMPONENT TO WEB COMPONENT AND LEAVE CHILD COMPONENTS AS ANGULAR SPECIFIC

    const subExample = createCustomElement(SubExampleComponent, {injector: this.injector});
    customElements.define('wc-sub-example', subExample);

    const example2 = createCustomElement(Example2Component, {injector: this.injector});
    customElements.define('wc-example2', example2);
  }

  // this only gets executed if bootstrap array above is empty
  ngDoBootstrap(appRef: ApplicationRef): void {
    // define custom elements
    // const element = createCustomElement(ExampleComponent, {injector: this.injector});
    // customElements.define('app-example2', element);

    // add AppComponent as application bootstrap (entry point) to allow for local development
    // appRef.bootstrap(AppComponent);
  }
}
