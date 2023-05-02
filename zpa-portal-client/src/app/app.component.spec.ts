import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DashboardTab, DashboardWidget } from './shared/models/dashboard-widget.model';
import { WidgetsService } from './shared/services/widgets.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ErrorService} from './shared/services/error.service';
import {Observable} from "rxjs";
import { DataService } from './shared/services/data.service';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

let translations: any = {"CARDS_TITLE": "This is a test"};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return new Observable(translations);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: '', redirectTo: `${DashboardTab.PatientOverview}`, pathMatch: 'full'},
          {path: DashboardTab.PatientOverview, component: AppComponent},
          {path: DashboardTab.MedicalPatientHistory + '/:patient', component: AppComponent},
          {path: '**', redirectTo: ''}
        ]),
        ToastNoAnimationModule.forRoot({
          positionClass :'toast-bottom-right'
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader},
        })
      ],
      declarations: [
        AppComponent
      ],
      providers:[
        AppComponent,
        DataService,
        WidgetsService,
        HttpClient,
        HttpHandler,
        DashboardComponent,
        ErrorService
      ]
    }).compileComponents();

    component = TestBed.inject(AppComponent);
    component.dashboardComponent = TestBed.inject(DashboardComponent);
  });

  it('should only initialise configurableWidgets when *starting* configure mode', () => {
    const widgets: DashboardWidget[] = [
      {widgetId: '1', dashboardTab: DashboardTab.PatientOverview, name: 'Medizinische Patientenhistorie', description: '', widgetInvocationParams: '', associatedTopic: '', icon: 'placeholder', url: 'https://www.google.com/', row: 1, column: 1, width: 2, height: 2, optimalWidth: 6, optimalHeight: 3}
    ];
    if (component.dashboardComponent) {
      component.dashboardComponent.widgets = widgets;
    }

    component.toggleConfigureMode(false);
    expect(component.configurableWidgets).toEqual([]);

    component.toggleConfigureMode(true);
    expect(component.configurableWidgets).toEqual(widgets);
  });

  it('should clear configurable widgets and set configure mode to false on save', () => {
    component.configurableWidgets = [
      {widgetId: '1', dashboardTab: DashboardTab.PatientOverview, name: "Widget1", description: "Text", widgetInvocationParams: '', associatedTopic: '', icon: "", url: "", row: 1, column: 3, width: 4, height: 2, optimalWidth: 6, optimalHeight: 3},
      {widgetId: '2', dashboardTab: DashboardTab.PatientOverview, name: "Widget2", description: "Text", widgetInvocationParams: '', associatedTopic: '', icon: "", url: "", row: 3, column: 3, width: 2, height: 1, optimalWidth: 2, optimalHeight: 1},
    ];
    component.saveDashboardWidgets();

    expect(component.isInConfigureMode).toBeFalsy();
    expect(component.configurableWidgets).toEqual([]);
  });
});
