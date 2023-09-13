import { ApplicationRef, enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule, createApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RootComponent } from './app/root.component';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { routes } from './app/app-routing';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { createCustomElement } from '@angular/elements';
import {localDevTokenInterceptor} from "./app/shared/interceptors/local-dev-token.interceptor";
import { errorInterceptor } from './app/shared/interceptors/error.interceptor';

if (environment.production || environment.name === 'webcomponent' ) {
  enableProdMode();
}

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const providers = [
  provideRouter(routes,
    withComponentInputBinding()
  ),
  importProvidersFrom(
    BrowserModule,
    ToastNoAnimationModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ),
  provideHttpClient(
    withInterceptors([localDevTokenInterceptor, errorInterceptor])
  ),
  provideAnimations(),
];

(async () => {

  let app: ApplicationRef;

  // bootstrapping application is required for local development
  // removing bootstrap ensures export of web components
  if(environment.name === 'webcomponent') {
    app = await createApplication({providers: providers});

    const rootComponent = createCustomElement(RootComponent, {injector: app.injector});
    customElements.define('zpa-root', rootComponent);
  } else {
    app = await bootstrapApplication(RootComponent, {providers: providers});
  }
  return app;
})();
