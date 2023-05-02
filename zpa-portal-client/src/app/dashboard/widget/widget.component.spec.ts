import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetComponent } from './widget.component';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetComponent, SafeUrlPipe ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
