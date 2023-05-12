import { bootstrapApplication, createApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing';
import { createCustomElement } from '@angular/elements';
import { ExampleComponent } from './app/example/example.component';
import { SubExampleComponent } from './app/example/sub-example/sub-example.component';
import { Example2Component } from './app/example2/example2.component';
import { environment } from 'src/environments/environment';
import { ApplicationRef } from '@angular/core';

(async () => {
  let app: ApplicationRef;

  // bootstrapping application is required for local development
  // removing bootstrap ensures export of web components
  if (environment.production) {
    app = await createApplication({
      providers: [
        provideRouter(routes)
      ]
    });
  } else {
    app = await bootstrapApplication(AppComponent, {
      providers: [
        provideRouter(routes)
      ]
    });
  }

  const appComponent = createCustomElement(AppComponent, {injector: app.injector});
  customElements.define('remote-app-component', appComponent);

//   const example = createCustomElement(ExampleComponent, {injector: app.injector});
//   customElements.define('wc-example', example);
//
// // ONLY CONVERT TOP LEVEL COMPONENT TO WEB COMPONENT AND LEAVE CHILD COMPONENTS AS ANGULAR SPECIFIC
//
//   const subExample = createCustomElement(SubExampleComponent, {injector: app.injector});
//   customElements.define('wc-sub-example', subExample);
//
//   const example2 = createCustomElement(Example2Component, {injector: app.injector});
//   customElements.define('wc-example2', example2);
})();
