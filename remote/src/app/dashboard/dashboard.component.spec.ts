import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { GridSlotsPipe } from '../shared/pipes/grid-slots.pipe';
import { GridAreaStylesPipe } from '../shared/pipes/grid-area-styles.pipe';
import { SafeUrlPipe } from '../shared/pipes/safe-url.pipe';
import { WidgetComponent } from './widget/widget.component';
import { DashboardTab, DashboardWidget } from '../shared/models/dashboard-widget.model';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DashboardComponent, GridSlotsPipe, GridAreaStylesPipe, WidgetComponent, SafeUrlPipe],
      providers: [
        {provide: ToastrService, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.widgets = [
      {
        widgetId: '1',
        dashboardTab: DashboardTab.PatientOverview,
        name: 'Medizinische Patientenhistorie',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        row: 1,
        column: 1,
        width: 2,
        height: 2,
        optimalWidth: 6,
        optimalHeight: 3
      },
      {
        widgetId: '2',
        dashboardTab: DashboardTab.PatientOverview,
        name: 'Medizinische Patientenhistorie',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        row: 1,
        column: 3,
        width: 2,
        height: 2,
        optimalWidth: 6,
        optimalHeight: 3
      },
      {
        widgetId: '3',
        dashboardTab: DashboardTab.PatientOverview,
        name: 'Medizinische Patientenhistorie',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        row: 3,
        column: 1,
        width: 2,
        height: 2,
        optimalWidth: 6,
        optimalHeight: 3
      },
      {
        widgetId: '4',
        dashboardTab: DashboardTab.PatientOverview,
        name: 'Medizinische Patientenhistorie',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        row: 3,
        column: 3,
        width: 2,
        height: 2,
        optimalWidth: 6,
        optimalHeight: 3
      },
      {
        widgetId: '5',
        dashboardTab: DashboardTab.PatientOverview,
        name: 'Medizinische Patientenhistorie',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        row: 4,
        column: 4,
        width: 2,
        height: 2,
        optimalWidth: 6,
        optimalHeight: 3
      }
    ];
  });

  it('should remove widget based on position', () => {
    const widgetToRemove = {
      widgetId: '3',
      dashboardTab: DashboardTab.PatientOverview,
      name: 'Medizinische Patientenhistorie',
      description: '',
      widgetInvocationParams: '',
      associatedTopic: '',
      icon: 'placeholder',
      url: 'https://www.google.com/',
      row: 3,
      column: 1,
      width: 2,
      height: 2,
      optimalWidth: 6,
      optimalHeight: 3
    };

    component.removeWidget(widgetToRemove);

    const filteredWidgets = component.widgets.filter(widget => widget.row !== widgetToRemove.row || widget.column !== widgetToRemove.column);
    expect(component.configurableWidgets).toEqual(filteredWidgets);
  });

  it('should only initialise configurableWidgets when *starting* configure mode', () => {
    const widgets: DashboardWidget[] = [
      {
        widgetId: '1',
        dashboardTab: DashboardTab.PatientOverview,
        name: 'Medizinische Patientenhistorie',
        description: '',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: 'placeholder',
        url: 'https://www.google.com/',
        row: 1,
        column: 1,
        width: 2,
        height: 2,
        optimalWidth: 6,
        optimalHeight: 3
      }
    ];
    component.widgets = widgets;

    component.toggleConfigureMode(false);
    expect(component.configurableWidgets).toEqual([]);

    component.toggleConfigureMode(true);
    expect(component.configurableWidgets).toEqual(widgets);
  });

  it('should clear configurable widgets and set configure mode to false on save', () => {
    component.configurableWidgets = [
      {
        widgetId: '1',
        dashboardTab: DashboardTab.PatientOverview,
        name: 'Widget1',
        description: 'Text',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: '',
        url: '',
        row: 1,
        column: 3,
        width: 4,
        height: 2,
        optimalWidth: 6,
        optimalHeight: 3
      },
      {
        widgetId: '2',
        dashboardTab: DashboardTab.PatientOverview,
        name: 'Widget2',
        description: 'Text',
        widgetInvocationParams: '',
        associatedTopic: '',
        icon: '',
        url: '',
        row: 3,
        column: 3,
        width: 2,
        height: 1,
        optimalWidth: 2,
        optimalHeight: 1
      },
    ];
    component.saveDashboardWidgets();

    expect(component.isInConfigureMode).toBeFalsy();
    expect(component.configurableWidgets).toEqual([]);
  });
});
