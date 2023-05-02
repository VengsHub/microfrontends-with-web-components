import { Component, HostListener, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { combineLatest, filter, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Widget } from './shared/models/widget.model';
import { AlertService } from './shared/services/alert/alert-service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragAndDropService } from './shared/services/drag-and-drop.service';
import { DashboardTab, DashboardWidget } from './shared/models/dashboard-widget.model';
import { MessagingService } from './shared/services/messaging.service';
import { ModalService } from './shared/services/modal.service';
import { FeaturesService } from './shared/services/features.service';
import { MENU_OPTIONS } from './shared/constants/menu-contants';
import { WidgetsService } from './shared/services/widgets.service';
import { AdditionalMenuOption } from '@kpark/zpa-components/lib/menu/menu-option.model';
import { DataService } from './shared/services/data.service';
import { Title } from '@angular/platform-browser';
import { RouteDataService } from './shared/services/route-data.service';
import { ErrorService } from './shared/services/error.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.hovered = '';
    this.modalService.hideModal();
  }

  @ViewChild(DashboardComponent) dashboardComponent?: DashboardComponent;

  activeRoute = DashboardTab.PatientOverview;

  // uses startWith to ensure stream firing an event initially, as combineLatest only fires once both streams have fired
  readonly additionalMenuOptions = [];

  isInConfigureMode = false;
  configurableWidgets: DashboardWidget[] = [];

  menuOptions = MENU_OPTIONS;
  additionalOptions: AdditionalMenuOption[] = [];

  hovered = '';

  private readonly unsubscribe = new Subject();

  constructor(private readonly tabTitle: Title,
              public readonly widgetsService: WidgetsService,
              public readonly featureService: FeaturesService,
              public readonly dataService: DataService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              public readonly routeDataService: RouteDataService,
              private readonly alertService: AlertService,
              public readonly dragAndDropService: DragAndDropService,
              private readonly messagingService: MessagingService,
              public readonly modalService: ModalService,
              readonly errorService: ErrorService,
              public translate: TranslateService) {

    translate.addLangs(['de']);
    translate.setDefaultLang('de');
    translate.use('de');

    dataService.patient$.pipe(takeUntil(this.unsubscribe)).subscribe(patient => {
      if (patient) tabTitle.setTitle(`${patient.firstName} ${patient.lastName}`);
    });

    messagingService.receiveMessages();

    this.activeRoute = AppComponent.getCurrentRoute() || DashboardTab.PatientOverview;

    dragAndDropService.updateWidgets.pipe(takeUntil(this.unsubscribe)).subscribe(widgets => {
      this.configurableWidgets = widgets;
    });

    this.handleSyncDuringConfigureMode();

    routeDataService.windowBackAndForwardEvents$.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.disableFullscreenMode();
      this.toggleConfigureMode(false);
    });
  }

  handleSyncDuringConfigureMode(): void {
    this.widgetsService.dashboardWidgets$?.pipe(takeUntil(this.unsubscribe)).subscribe(widgets => {
      this.configurableWidgets.forEach(cWidget => {
        const updatedWidget = widgets.find(widget => widget.widgetId === cWidget.widgetId);
        if (updatedWidget) {
          cWidget.name = updatedWidget.name;
          cWidget.url = updatedWidget.url;
          cWidget.associatedTopic = updatedWidget.associatedTopic;
        }
      });
    });
  }

  disableFullscreenMode(): void {
    if (this.dashboardComponent) {
      this.dashboardComponent.fullscreenWidget = undefined;
    }
  }

  toggleConfigureMode(startConfigureMode: boolean): void {
    // get snapshot of current widget when starting configure mode (only shallow copy)
    if (startConfigureMode && this.dashboardComponent) {
      this.configurableWidgets = [...this.dashboardComponent.widgets];
    }
    this.isInConfigureMode = startConfigureMode;
  }

  dragWidgetFromOverview(widget: Widget): void {
    const dashboardWidget = {
      ...widget,
      dashboardTab: this.activeRoute,
      width: widget.optimalWidth,
      height: widget.optimalHeight,
      row: 0,
      column: 0
    };

    this.dragAndDropService.startDragging(dashboardWidget, this.dashboardComponent?.widgets || [], 'drag');
  }

  saveDashboardWidgets(): void {
    this.widgetsService.updateDashboardWidgets(this.configurableWidgets);
    this.configurableWidgets = [];
    this.toggleConfigureMode(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

  private static getCurrentRoute(): DashboardTab {
    return window.location.pathname.substring(1).split('/')[0] as DashboardTab;
  }
}
