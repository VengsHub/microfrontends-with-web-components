import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ErrorService } from './error.service';
import { take } from 'rxjs';
import { ToastNoAnimationModule, ToastrService } from 'ngx-toastr';
import { AlertService } from './alert/alert-service';
import { RouterTestingModule } from '@angular/router/testing';
import {PortalError} from "../models/portal-error.model";

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastNoAnimationModule.forRoot({
          positionClass: 'toast-bottom-right'
        })
      ],
      providers: [ErrorService,
        AlertService,
        ToastrService
      ]
    });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update message', fakeAsync(() => {
    const testError: PortalError = {
      affectedService: "ikarus",
      code: "500",
      technicalDescription: "test technical",
      timeOfOccurrence: "",
      userAccount: "",
      verboseDescription: "test verbose"
    };

    service.newError(testError, true);
    service.error$.pipe(take(1)).subscribe(result => expect(result).toStrictEqual(testError));
    tick(1);
    flush();
  }));
});
