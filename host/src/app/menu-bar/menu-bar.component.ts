import { Component, computed, signal } from '@angular/core';
import { fromEvent, map } from 'rxjs';
import { TabManagementService } from '../shared/services/tab-management.service';
import { TabComponent } from './tab/tab.component';
import { NgIf, NgFor, NgOptimizedImage, AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { backdropFade, flyoutMenuAnimation, flyoutUserMenuAnimation, flyoutSearchAnimation } from '../../animations';
import { NavigationItemsService } from '../shared/services/navigation-items.service';
import { FlyoutMenuComponent } from './flyout-menu/flyout-menu.component';
import { IconComponent } from '../shared/components/icon.component';
import { FlyoutUserMenuComponent } from './flyout-user-menu/flyout-user-menu.component';
import { FlyoutSearchComponent } from './flyout-search/flyout-search.component';
import { ClickOutsideDirective } from '../shared/directives/click-outside.directive';
import { UserInterfaceService } from '../shared/services/user-interface.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, IconComponent, TabComponent, FlyoutMenuComponent, NgOptimizedImage, AsyncPipe, FlyoutUserMenuComponent, FlyoutSearchComponent, ClickOutsideDirective],
  animations: [flyoutMenuAnimation, backdropFade, flyoutUserMenuAnimation, flyoutSearchAnimation]
})
export class MenuBarComponent {

  activeTabIndex = 0;

  private windowWidth$ = fromEvent(window, 'resize').pipe(
    map(event => (event.target as Window).innerWidth)
  );
  readonly cWindowWidth = toSignal(this.windowWidth$, {initialValue: window.innerWidth});

  readonly cIsMobile = computed(() => this.cWindowWidth() <= 480);

  readonly cTabBarWidth = computed(() => {
    const flyoutMenuButtonWidth = 58;
    const newTabButtonWidth = 48;
    const actionButtonsWidth = 4 * 48;
    return this.cWindowWidth() - flyoutMenuButtonWidth - newTabButtonWidth - actionButtonsWidth;
  });

  readonly cTabWidth = computed(() => {
    const minWidth = 80;
    const maxWidth = 280;
    const responsiveWidth = this.cTabBarWidth() / this.tabService.cTabs().length;
    return Math.max(Math.min(responsiveWidth, maxWidth), minWidth);
  });

  readonly cTabsShouldShrink = computed(() =>
    this.tabService.cTabs().length * this.cTabWidth() > this.cTabBarWidth()
  );

  readonly cMaxVisibleTabs = computed(() => {
    const newTabButtonWidth = 48;
    const shrunkTabWidth = 44;
    const remainingWidthForShrunkTabs = this.cTabBarWidth() - newTabButtonWidth - this.cTabWidth();
    return Math.floor(remainingWidthForShrunkTabs / shrunkTabWidth);
  });

  readonly cTabsAreOverflowing = computed(() =>
    this.tabService.cTabs().length > this.cMaxVisibleTabs()
  );

  sFlyoutMenuOpen = signal(false);
  sFlyoutSearchOpen = signal(false);
  sFlyoutUserMenuOpen = signal(false);

  cShowBackdrop = computed(() => this.sFlyoutMenuOpen());

  constructor(readonly tabService: TabManagementService,
              readonly navigationItemsService: NavigationItemsService,
              readonly userInterfaceService: UserInterfaceService) {
  }
}
