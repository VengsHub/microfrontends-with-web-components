import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import { routes } from './app/app-routing';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { localDevTokenInterceptor } from './app/shared/interceptors/local-dev-token.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes,
      withComponentInputBinding()
    ),
    importProvidersFrom(
      BrowserModule,
      HttpClientModule
    ),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([localDevTokenInterceptor])
    )
  ]
})
  .catch(err => console.error(err));
