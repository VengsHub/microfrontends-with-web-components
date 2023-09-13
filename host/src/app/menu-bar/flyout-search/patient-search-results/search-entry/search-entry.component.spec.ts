import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEntryComponent } from './search-entry.component';
import { PatientSearchResultsMock } from '../../../../../mocks/patient-search.mock';
import { PatientHit } from '../../../../../../generated/openapi';

describe('SearchEntryComponent', () => {
  let component: SearchEntryComponent;
  let fixture: ComponentFixture<SearchEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchEntryComponent]
    });
    fixture = TestBed.createComponent(SearchEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('displays all the markup elements in a search entry if given a patient', () => {
    it('should diplay a patients name and gender', () => {
      component.patient = PatientSearchResultsMock.hits[0] as PatientHit;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.person > div > span').textContent).toEqual('Lehmann, Jascha');
      expect(fixture.nativeElement.querySelector('.person > div > span:nth-child(2)').textContent).toEqual(`\u00A0(u)`);
    })

    it('should display the patients adress', () => {
      component.patient = PatientSearchResultsMock.hits[0] as PatientHit;
      fixture.detectChanges();
      const expectedAddress = 'Mockstraße 123';
      const expectedCity = "12345 Mockhausen";

      expect(fixture.nativeElement.querySelector('.person-information__address > div').textContent).toEqual(expectedAddress);
      expect(fixture.nativeElement.querySelector('.person-information__address > div:nth-child(2)').textContent).toEqual(expectedCity);
    })

    it('should display the patients birthay and the betriebsstättennummer', () => {
      component.patient = PatientSearchResultsMock.hits[0] as PatientHit;
      const expectedIBSNR = '123456789';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.person-information__metadata > div').textContent).toContain('07.06.1967');
      expect(fixture.nativeElement.querySelector('.person-information__metadata > div:nth-child(2)').textContent).toContain(expectedIBSNR);
    });
  });
});
