import {Component, computed} from '@angular/core';
import {IframeComponentComponent} from "../iframe-component/iframe-component.component";
import {WidgetIframe} from "../shared/models/widget-iframe.model";
import {SecondTabService} from "../shared/services/second-tab.service";
import {RouteDataService} from "../shared/services/route-data.service";
import {DashboardTab} from "../shared/models/dashboard-widget.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-tab-content-wrapper',
  standalone: true,
  imports: [IframeComponentComponent, NgIf],
  templateUrl: './tab-content-wrapper.component.html',
  styleUrls: ['./tab-content-wrapper.component.scss'],
})
export class TabContentWrapperComponent {
  constructor(private readonly routeDataService: RouteDataService,
              protected readonly secondTabService: SecondTabService) {
  }
  cCurrentTab = computed(() => {
    if (this.routeDataService.cActiveDashboardTab() === DashboardTab.MasterData) {
      return this.dummyIframe;
    }
    else if (this.routeDataService.cActiveDashboardTab() === DashboardTab.SecondTab) {
      return this.secondTabService.cSecondTabContent();
    }
    return null;
  })
  dummyIframe: WidgetIframe = {
    widgetUrl: "http://localhost:8989/medication",
    title: "Labor",
    widgetInvocationParams: []
  }
}
