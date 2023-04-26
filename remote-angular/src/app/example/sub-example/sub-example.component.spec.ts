import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubExampleComponent } from './sub-example.component';

describe('SubExampleComponent', () => {
  let component: SubExampleComponent;
  let fixture: ComponentFixture<SubExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
