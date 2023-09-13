import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuBarComponent} from './menu-bar.component';
import {TabComponent} from './tab/tab.component';
import {TabManagementService} from '../shared/services/tab-management.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBarComponent, TabComponent, HttpClientTestingModule],
      providers: [
        TabManagementService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // set window.innerWidth to 1024
    Object.defineProperty(window, 'innerWidth', {value: 1024});
  });

  it('should have initial value of 1024', () => {
    expect(component.cWindowWidth()).toEqual(1024);
  });

  it('should detect mobile', () => {
    Object.defineProperty(window, 'innerWidth', {value: 480});
    window.dispatchEvent(new Event('resize'));

    expect(component.cIsMobile()).toEqual(true);
  });

  it('should have service with initial tab value', () => {
    expect(component.tabService.cTabs().length).toEqual(8);
  });

  it('should act according to initial values', () => {
    expect(component.cIsMobile()).toEqual(false);
    expect(component.cTabBarWidth()).toEqual(726);
    expect(component.cTabWidth()).toEqual(90.75);
    expect(component.cTabsShouldShrink()).toEqual(false);
    expect(component.cMaxVisibleTabs()).toEqual(13);
    expect(component.cTabsAreOverflowing()).toEqual(false);
  });

  it('should react to too many tabs', () => {
    for (let i = 0; i < 7; i++) {
      component.tabService.addTab();
    }
    expect(component.tabService.cTabs().length).toEqual(15);

    expect(component.cTabWidth()).toEqual(80);
    expect(component.cTabsShouldShrink()).toEqual(true);
    expect(component.cMaxVisibleTabs()).toEqual(13);
    expect(component.cTabsAreOverflowing()).toEqual(true);
  });

  it('should react to window resize to 1920', () => {
    Object.defineProperty(window, 'innerWidth', {value: 1920});
    window.dispatchEvent(new Event('resize'));

    expect(component.cWindowWidth()).toEqual(1920);
    expect(component.cTabBarWidth()).toEqual(1622);
    expect(component.cTabWidth()).toEqual(202.75);
    expect(component.cTabsShouldShrink()).toEqual(false);
    expect(component.cMaxVisibleTabs()).toEqual(31);
    expect(component.cTabsAreOverflowing()).toEqual(false);
  });
});
