import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEntryContextMenuComponent } from './search-entry-context-menu.component';

describe('SearchEntryContextMenuComponent', () => {
  let component: SearchEntryContextMenuComponent;
  let fixture: ComponentFixture<SearchEntryContextMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchEntryContextMenuComponent]
    });
    fixture = TestBed.createComponent(SearchEntryContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('search-entry-context-menu tests', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display the action items', () => {
      const actionItems = fixture.nativeElement.querySelectorAll('.action');
      expect(actionItems.length).toBe(6);
    });

  });
});
