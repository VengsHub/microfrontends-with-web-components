import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientSearchResultsComponent } from './patient-search-results.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PatientSearchService } from '../../../shared/services/patient-search.service';
import { UserInterfaceService } from "../../../shared/services/user-interface.service";

const userInterfaceService = {
  cIsMobile: jest.fn().mockReturnValue(false),
  sPatientSearchScrollDirection: { set: jest.fn() }
}
const patientSearchService =  {
  cPatients: jest.fn().mockReturnValue({ hits: new Array(6) }),
  sIsLoading: jest.fn().mockReturnValue(false),
};

describe('PatientSearchResultsComponent', () => {
  let component: PatientSearchResultsComponent;
  let fixture: ComponentFixture<PatientSearchResultsComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PatientSearchResultsComponent],
      providers: [
        { provide: PatientSearchService, useValue: patientSearchService},
        { provide: UserInterfaceService, useValue: userInterfaceService }
      ]
    });
    fixture = TestBed.createComponent(PatientSearchResultsComponent);
    component = fixture.componentInstance;
    component['lastScrollTop']= 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set scroll direction to "scrollDown" when scrolling down', () => {
    patientSearchService.cPatients = jest.fn().mockReturnValue({ hits: new Array(6) });
    userInterfaceService.cIsMobile = jest.fn().mockReturnValue(false);
    component['lastScrollTop'] = 50;
    const event: Partial<Event> = {
      target: {
        scrollTop: 100
      } as Element
    };
    component.onScroll(event as Event);
    expect(userInterfaceService.sPatientSearchScrollDirection.set).toHaveBeenCalledWith('scrollDown');
  });

  it('should set scroll direction to "scrollUp" when scrolling up', () => {
    patientSearchService.cPatients = jest.fn().mockReturnValue({ hits: new Array(6) });
    userInterfaceService.cIsMobile = jest.fn().mockReturnValue(false);
    component['lastScrollTop'] = 100;
    const event: Partial<Event> = {
      target: {
        scrollTop: -50
      } as Element
    };
    component.onScroll(event as Event);
    expect(userInterfaceService.sPatientSearchScrollDirection.set).toHaveBeenCalledWith('scrollUp');
  });

});
