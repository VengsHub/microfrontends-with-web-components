import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetComponent } from './sheet.component';

describe('SheetComponent', () => {
  let component: SheetComponent;
  let fixture: ComponentFixture<SheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    fixture = TestBed.createComponent(SheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
