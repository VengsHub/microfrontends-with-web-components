import { bootstrapApplication, createApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing';
import { createCustomElement } from '@angular/elements';
import { ExampleComponent } from './app/example/example.component';
import { SubExampleComponent } from './app/example/sub-example/sub-example.component';
import { Example2Component } from './app/example2/example2.component';

(async () => {
  // replace with this for local development
  // const app = await bootstrapApplication(AppComponent, {
  const app = await createApplication({
    providers: [
      provideRouter(routes)
    ]
  });

  const example = createCustomElement(ExampleComponent, {injector: app.injector});
  customElements.define('wc-example', example);

// ONLY CONVERT TOP LEVEL COMPONENT TO WEB COMPONENT AND LEAVE CHILD COMPONENTS AS ANGULAR SPECIFIC

  const subExample = createCustomElement(SubExampleComponent, {injector: app.injector});
  customElements.define('wc-sub-example', subExample);

  const example2 = createCustomElement(Example2Component, {injector: app.injector});
  customElements.define('wc-example2', example2);
})();
