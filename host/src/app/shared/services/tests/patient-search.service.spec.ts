import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PatientSearchService, UIPatientStatus } from '../patient-search.service';
import { RouterTestingModule } from '@angular/router/testing';
import {
  invalidPatientSearchRequestMock,
  PatientSearchResultsMock,
  unfindableValidPatientSearchRequestMock,
  validPatientSearchRequestMock
} from '../../../../mocks/patient-search.mock';
import { of } from 'rxjs';
import { RouteDataService } from '../route-data.service';
import { RestPatientSearchService } from '../rest-services/rest-patient-search.service';

const MockRouteDataService = {
  cQueryParams: () => ({iBSNR: '12345'})
};
const MockRestPatientSearchService = {
  searchPatients: (request: {vorname: string}) => {
    const result = PatientSearchResultsMock.hits.find((entry) => {
      return entry.vorname === request.vorname;
    }) ?? {error: 'Patient not found'};
    return of(result);
  }
};

describe('PatientSearchService', () => {
  let service: PatientSearchService;
  const patientsMock = PatientSearchResultsMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [PatientSearchService,
        {provide: RouteDataService, useValue: MockRouteDataService},
        {provide: RestPatientSearchService, useValue: MockRestPatientSearchService},
      ]
    });
    service = TestBed.inject(PatientSearchService);
  });

  it('should find existing Patient by name', fakeAsync(() => {
    const expectedResult = patientsMock.hits[0];
    service.searchPatients(validPatientSearchRequestMock);
    tick(500);
    expect(service.cPatients()).toEqual(expectedResult);
  }));

  it('should not find non-existing Patient by name', fakeAsync(() => {
    const expectedResult = {error: 'Patient not found'};
    service.searchPatients(unfindableValidPatientSearchRequestMock);
    tick(500);
    expect(service.cPatients()).toEqual(expectedResult);
  }));

  it('should not search with invalid PatientSearchRequest', fakeAsync(() => {
    service.searchPatients(invalidPatientSearchRequestMock);
    tick(500);
    expect(service.cPatients()).toEqual(undefined);
  }));

  it('should reset result', fakeAsync(() => {
    const expectedResult = patientsMock.hits[0];
    service.searchPatients(validPatientSearchRequestMock);
    tick(500);
    expect(service.cPatients()).toEqual(expectedResult);
    service.resetResult$.next();
    expect(service.cPatients()).toEqual(undefined);
  }));
});

describe('PatientSearchService Helper functions', () => {
  let service: PatientSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [PatientSearchService]
    });
    service = TestBed.inject(PatientSearchService);
  });

  it('should validate params correctly', () => {
    expect(service['areParamsValidToBeRequested'](validPatientSearchRequestMock)).toBeTruthy();
    expect(service['areParamsValidToBeRequested'](invalidPatientSearchRequestMock)).toBeFalsy();
  });

  it('should reformate date string correctly', function () {
    expect(service['reformatDateString']('12.10.1999')).toEqual('1999-10-12');
  });

  it('should get patient status by value', function () {
    expect(service['getStatusByValue']('Aktiv')).toEqual(UIPatientStatus.Aktiv);
  });
});
