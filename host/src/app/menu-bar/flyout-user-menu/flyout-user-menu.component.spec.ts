import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutUserMenuComponent } from './flyout-user-menu.component';
import { HttpClientModule } from "@angular/common/http";

describe('FlyoutUserMenuComponent', () => {
  let component: FlyoutUserMenuComponent;
  let fixture: ComponentFixture<FlyoutUserMenuComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FlyoutUserMenuComponent, HttpClientModule]
    });
    fixture = TestBed.createComponent(FlyoutUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
