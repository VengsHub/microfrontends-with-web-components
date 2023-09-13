import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeComponentComponent } from './iframe-component.component';

describe('IframeComponentComponent', () => {
  let component: IframeComponentComponent;
  let fixture: ComponentFixture<IframeComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IframeComponentComponent]
    });
    fixture = TestBed.createComponent(IframeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
