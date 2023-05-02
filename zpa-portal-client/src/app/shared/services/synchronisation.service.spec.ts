import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { SynchronisationService } from './synchronisation.service';

describe('SynchronisationService', () => {
  let service: SynchronisationService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SynchronisationService]
    });
    service = TestBed.inject(SynchronisationService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http get on intervalTimer$ usage', fakeAsync(() => {
    const expectedSyncInterval = 60000;

    service.intervalTimer$.subscribe(res => expect(res).toEqual(0));
    http.expectOne({method: 'GET', url: 'api/admin/synchronisation'}).flush(expectedSyncInterval, {status: 200, statusText: 'ok'});
    tick();
    discardPeriodicTasks();
  }));
})
