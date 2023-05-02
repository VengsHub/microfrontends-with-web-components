import {inject, TestBed} from "@angular/core/testing";
import {FeaturesService} from "../services/features.service";
import {IsVisibleFeaturePipe} from "./is-visible-feature.pipe";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('isVisibleFeaturePipe', () => {
  let pipe: IsVisibleFeaturePipe;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          FeaturesService
        ]
      });
    http = TestBed.inject(HttpTestingController);
  });

  it('should only return true if the feature name is in the list', inject([FeaturesService], (service: FeaturesService) => {
    pipe = new IsVisibleFeaturePipe(service);
    const mockFeature = ['TestFeature'];

    http
      .expectOne({method: 'GET', url: 'api/admin/feature'})
      .flush(mockFeature, {status: 200, statusText: 'ok'});

    const isVisible = pipe.transform('TestFeature');
    const isNotVisible = pipe.transform('NotAFeature');
    const isNotVisible2 = pipe.transform('');

    expect(isVisible).toBe(true);
    expect(isNotVisible).toBe(false);
    expect(isNotVisible2).toBe(false);
  }));
});
