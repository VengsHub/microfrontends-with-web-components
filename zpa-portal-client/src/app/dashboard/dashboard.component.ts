import {Component, EventEmitter, Input, Output} from '@angular/core';
import { DashboardWidget } from '../shared/models/dashboard-widget.model';
import { DragAndDropService } from '../shared/services/drag-and-drop.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @Input() widgets: DashboardWidget[] = [];
  @Input() isInConfigureMode = false;
  @Output() updateConfigurableWidgets = new EventEmitter<DashboardWidget[]>();
  columnAmount = 8;
  fullscreenWidget?: DashboardWidget;

  hideWidget?: DashboardWidget;

  constructor(public readonly dragAndDropService: DragAndDropService) {
  }

  removeWidget(widgetToRemove: DashboardWidget): void {
    const filteredWidgets = this.widgets.filter(widget => widget.row !== widgetToRemove.row || widget.column !== widgetToRemove.column);
    this.updateConfigurableWidgets.emit(filteredWidgets);
  }

  dragStart(widget: DashboardWidget, action: 'drag' | 'resize'): void {
    this.dragAndDropService.resetAllDragData();
    this.dragAndDropService.startDragging(widget, this.widgets, action);
  }
}
