import { Component } from '@angular/core';
import { combineLatest, fromEvent, map, shareReplay, startWith } from 'rxjs';
import { TabManagementService } from '../shared/services/tab-management.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  activeTabIndex = 0;
  hoveredTabIndex = -1;

  private readonly windowWidth$ = fromEvent(window, 'resize').pipe(
    map(event => (event.target as Window).innerWidth),
    startWith(window.innerWidth),
    shareReplay(1)
  );

  readonly isMobile$ = this.windowWidth$.pipe(map(windowWidth => windowWidth <= 480));

  private readonly tabBarWidth$ = this.windowWidth$.pipe(map(windowWidth => {
    const flyoutMenuButtonWidth = 58;
    const actionButtonsWidth = 4 * 48;
    return windowWidth - flyoutMenuButtonWidth - actionButtonsWidth;
  }));


  readonly tabWidth$ = this.windowWidth$.pipe(map(windowWidth => {
    if (windowWidth > 1440) {
      return 280;
    } else if (windowWidth > 1024) {
      return 184;
    } else {
      return 136;
    }
  }));

  readonly tabShouldShrink$ = combineLatest([this.tabService.tabs$, this.tabBarWidth$, this.tabWidth$]).pipe(
    map(([tabs, tabBarWidth, tabWidth]) => {
      const newTabButtonWidth = 48;
      return tabs.length * tabWidth > tabBarWidth - newTabButtonWidth
    })
  );

  readonly maxVisibleTabs$ = combineLatest([this.tabBarWidth$, this.tabWidth$]).pipe(
    map(([tabBarWidth, tabWidth]) => {
      const newTabButtonWidth = 48;
      const shrunkTabWidth = 44;
      const remainingWidthForShrunkTabs = tabBarWidth - newTabButtonWidth - tabWidth;
      return remainingWidthForShrunkTabs / shrunkTabWidth;
    })
  );

  readonly tabsAreOverflowing$ = combineLatest([this.tabService.tabs$, this.maxVisibleTabs$]).pipe(
    map(([tabs, maxTabs]) => tabs.length > maxTabs)
  );

  constructor(readonly tabService: TabManagementService) {
  }
}
