import { Component } from '@angular/core';
import { DashboardWidget } from '../shared/models/dashboard-widget.model';
import { DragAndDropService } from '../shared/services/drag-and-drop.service';
import { IconPipe } from '../shared/pipes/icon.pipe';
import { WidgetComponent } from './widget/widget.component';
import { GetPositionPipe } from '../shared/pipes/get-position.pipe';
import { GridSlotsPipe } from '../shared/pipes/grid-slots.pipe';
import { IsHoveredPipe } from '../shared/pipes/is-hovered.pipe';
import { WidgetsEqualPipe } from '../shared/pipes/widgets-equal.pipe';
import { GridAreaStylesPipe } from '../shared/pipes/grid-area-styles.pipe';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { WidgetOverviewComponent } from '../widget-overview/widget-overview.component';
import { Widget } from '../shared/models/widget.model';
import { WidgetsService } from '../shared/services/widgets.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouteDataService } from '../shared/services/route-data.service';
import { DataService } from '../shared/services/data.service';
import { IdentityBarComponent } from './identity-bar/identity-bar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    WidgetComponent,
    IconPipe,
    GetPositionPipe,
    GridSlotsPipe,
    IsHoveredPipe,
    WidgetsEqualPipe,
    GridAreaStylesPipe,
    NgFor,
    NgIf,
    AsyncPipe,
    IdentityBarComponent,
    WidgetOverviewComponent,
  ]
})
export class DashboardComponent {

  widgets: DashboardWidget[] = [];
  isInConfigureMode = false;
  columnAmount = 8;
  fullscreenWidget?: DashboardWidget;

  hideWidget?: DashboardWidget;
  configurableWidgets: DashboardWidget[] = [];

  constructor(private readonly routeDataService: RouteDataService,
              public readonly dataService: DataService,
              public readonly widgetsService: WidgetsService,
              public readonly dragAndDropService: DragAndDropService) {
    routeDataService.windowBackAndForwardEvents$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.fullscreenWidget = undefined;
      this.toggleConfigureMode(false);
    });

    this.handleSyncDuringConfigureMode();

    dragAndDropService.updateWidgets.pipe(takeUntilDestroyed()).subscribe(widgets => {
      this.configurableWidgets = widgets;
    });

    widgetsService.dashboardWidgets$.pipe(takeUntilDestroyed()).subscribe(widgets => {
      this.widgets = widgets;
    })
  }

  handleSyncDuringConfigureMode(): void {
    this.widgetsService.dashboardWidgets$?.pipe(takeUntilDestroyed()).subscribe(widgets => {
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

  removeWidget(widgetToRemove: DashboardWidget): void {
    this.configurableWidgets = this.widgets.filter(widget => widget.row !== widgetToRemove.row || widget.column !== widgetToRemove.column);
  }

  dragStart(widget: DashboardWidget, action: 'drag'|'resize'): void {
    this.dragAndDropService.resetAllDragData();
    this.dragAndDropService.startDragging(widget, this.widgets, action);
  }

  dragWidgetFromOverview(widget: Widget): void {
    const dashboardWidget = {
      ...widget,
      dashboardTab: this.routeDataService.cActiveDashboardTab(),
      width: widget.optimalWidth,
      height: widget.optimalHeight,
      row: 0,
      column: 0
    };

    this.dragAndDropService.startDragging(dashboardWidget, this.widgets || [], 'drag');
  }

  toggleConfigureMode(startConfigureMode: boolean): void {
    // get snapshot of current widget when starting configure mode (only shallow copy)
    if (startConfigureMode) {
      this.configurableWidgets = [...this.widgets];
    }
    this.isInConfigureMode = startConfigureMode;
  }

  saveDashboardWidgets(): void {
    this.widgetsService.updateDashboardWidgets(this.configurableWidgets);
    this.configurableWidgets = [];
    this.toggleConfigureMode(false);
  }
}
