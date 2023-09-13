import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabContentWrapperComponent } from './tab-content-wrapper.component';
import {ToastrService} from "ngx-toastr";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TabContentContainerComponent', () => {
  let component: TabContentWrapperComponent;
  let fixture: ComponentFixture<TabContentWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TabContentWrapperComponent, HttpClientTestingModule],
      providers: [
        {provide: ToastrService, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(TabContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
