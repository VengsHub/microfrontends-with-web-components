import { Injectable, signal } from '@angular/core';
import {
  BehaviorSubject, debounce,
  filter,
  finalize,
  map,
  merge,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap, timer,
} from 'rxjs';
import { RouteDataService } from './route-data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RestPatientSearchService } from './rest-services/rest-patient-search.service';
import { PatientSearchRequest } from '../models/patient-search-request.model';
import { PatientStatus } from '../models/patient-status.model';

export type PatientFormParams = Omit<PatientSearchRequest, 'ibsnrArray'>

@Injectable()
export class PatientSearchService {
  sIsLoading = signal(false);
  public resetResult$ = new Subject<void>();
  private patientsRequest$: BehaviorSubject<PatientSearchRequest> = new BehaviorSubject({ibsnrArray: ['12345']});
  private emptyResult$ = this.resetResult$.pipe(map((_) => undefined));

  constructor(private readonly restPatientSearchService: RestPatientSearchService, private readonly routeService: RouteDataService) {
  }

  requestedPatients$ = this.patientsRequest$.pipe(
    filter(this.areParamsValidToBeRequested),
    tap(() => this.sIsLoading.set(true)),
    // slight delay to show loading spinner long enough for user
    debounce(() => timer(500)),
    switchMap(request => this.restPatientSearchService.searchPatients(request).pipe(
      finalize(() => this.sIsLoading.set(false))
    )),
    startWith(undefined),
    shareReplay(1),
  );

  patients$ = merge(this.requestedPatients$, this.emptyResult$);
  cPatients = toSignal(this.patients$);

  searchPatients(patientSearchRequest: PatientFormParams): void {
    const ibsnr = this.routeService.cQueryParams().iBSNR.length > 0 ? this.routeService.cQueryParams().iBSNR : '12345';
    const formattedDate = !patientSearchRequest.geburtsdatum ? undefined : this.reformatDateString(patientSearchRequest.geburtsdatum);
    const status = this.getStatusByValue(patientSearchRequest.status as string) as PatientStatus;
    const params = {
      ...patientSearchRequest,
      ibsnrArray: [ibsnr],
      geburtsdatum: formattedDate,
      status: status !== UIPatientStatus.Alle ? status : undefined
    };

    this.patientsRequest$.next(params);
  }

  private areParamsValidToBeRequested(formValues: PatientSearchRequest): boolean {
    const {vorname, nachname, geburtsdatum} = formValues;
    return !!vorname && vorname.length >= 2 || !!nachname && nachname.length >= 2 || !!geburtsdatum;
  }

  private reformatDateString(dateStr: string): string {
    return dateStr.split('.').reverse().join('-');
  }

  private getStatusByValue(value: string) {
    const val = Object.keys(UIPatientStatus).find(key => key === value);
    return UIPatientStatus[val as keyof typeof UIPatientStatus];
  }
}

export const UIPatientStatus = {
  Aktiv: 'AKTIV',
  Inaktiv: 'INAKTIV',
  Alle: 'ALLE',
};
