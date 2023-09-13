import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutMenuComponent } from './flyout-menu.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FlyoutMenuComponent', () => {
  let component: FlyoutMenuComponent;
  let fixture: ComponentFixture<FlyoutMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FlyoutMenuComponent]
    });
    fixture = TestBed.createComponent(FlyoutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
