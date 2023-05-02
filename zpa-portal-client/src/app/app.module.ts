import { ApplicationRef, Injector, NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WidgetComponent} from './dashboard/widget/widget.component';
import {SafeUrlPipe} from './shared/pipes/safe-url.pipe';
import {GridAreaStylesPipe} from './shared/pipes/grid-area-styles.pipe';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GridSlotsPipe} from './shared/pipes/grid-slots.pipe';
import {IconPipe} from './shared/pipes/icon.pipe';
import {IdentityBarComponent} from './identity-bar/identity-bar.component';
import {WidgetOverviewComponent} from './widget-overview/widget-overview.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { GetPositionPipe } from './shared/pipes/get-position.pipe';
import { IsHoveredPipe } from './shared/pipes/is-hovered.pipe';
import { FormsModule } from '@angular/forms';
import { AgePipe } from './shared/pipes/age.pipe';
import { PatientInfoComponent } from './modal-components/patient-info/patient-info.component';
import { WidgetsEqualPipe } from './shared/pipes/widgets-equal.pipe';
import { AutoAnimateDirective } from './shared/directives/auto-animate.directive';
import {SortPipe} from "./shared/pipes/sort.pipe";
import { TopicFilterComponent } from './widget-overview/topic-filter/topic-filter.component';
import { FilterByNamePipe } from './shared/pipes/filter-by-name.pipe';
import { FilterByTopicsPipe } from './shared/pipes/filter-by-topics.pipe';
import { WidgetSizePreviewComponent } from './widget-overview/widget-size-preview/widget-size-preview.component';
import { PreviewPositionPipe } from './shared/pipes/preview-position.pipe';
import {ClickOutsideDirective} from "./shared/directives/click-outside.directive";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootComponent } from './root.component';
import {IsVisibleFeaturePipe} from "./shared/pipes/is-visible-feature.pipe";
import {KparkComponentsModule} from '@kpark/zpa-components';
import {ErrorComponent} from './error/error.component';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { IconsModule } from './icons.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { createCustomElement } from '@angular/elements';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    WidgetComponent,
    SafeUrlPipe,
    GridAreaStylesPipe,
    DashboardComponent,
    GridSlotsPipe,
    IconPipe,
    IdentityBarComponent,
    WidgetOverviewComponent,
    GetPositionPipe,
    IsHoveredPipe,
    FilterByNamePipe,
    AgePipe,
    SortPipe,
    PatientInfoComponent,
    WidgetsEqualPipe,
    AutoAnimateDirective,
    TopicFilterComponent,
    FilterByTopicsPipe,
    WidgetSizePreviewComponent,
    PreviewPositionPipe,
    ClickOutsideDirective,
    IsVisibleFeaturePipe,
    ErrorComponent
  ],
  imports: [
    KparkComponentsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ToastNoAnimationModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    IconsModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: []
})

export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap(appRef: ApplicationRef) {
    // using createCustomElement from angular package it will convert angular component to stander web component
    const el = createCustomElement(AppComponent, {
      injector: this.injector
    });
    // using built in the browser to create your own custome element name
    customElements.define('zpa-portal-client', el);
    // appRef.bootstrap(AppComponent); - INSERT FOR LOCAL DEVELOPMENT & REMOVE FOR PROD/EXPORT
  }
}
