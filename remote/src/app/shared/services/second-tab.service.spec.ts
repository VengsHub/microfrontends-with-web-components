import {SecondTabService} from "./second-tab.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {FeaturesService} from "./features.service";
import {InputParamsService} from "./input-params.service";
import {of} from "rxjs";
import {widgetInvocationParams} from "../models/widget-iframe.model";

describe('SecondTabService', () => {
  let service: SecondTabService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FeaturesService,
        {provide: InputParamsService, useValue: {restUrl$: of('api/')}}
      ]
    });

    service = TestBed.inject(SecondTabService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set widgetInvocationParams', () => {
    const response = {
      title: 'test',
      widgetUrl: 'test.com',
      widgetInvocationParams: ['patientenId', 'iBSNR']
    };

    http
      .expectOne({method: 'GET', url: 'api/second-tab/content'})
      .flush(response, {status: 200, statusText: 'ok'});

    expect(service.cSecondTabContent()).toEqual(response)
    expect(service.cSecondTabContent()?.title).toEqual('test')
    expect(service.cSecondTabContent()?.widgetUrl).toEqual('test.com')
    expect(service.cSecondTabContent()?.widgetInvocationParams).toContain(widgetInvocationParams.I_BSNR)
    expect(service.cSecondTabContent()?.widgetInvocationParams).toContain(widgetInvocationParams.PATIENTEN_ID)
  });

})
