import { Injectable } from '@angular/core';
import { map, shareReplay, switchMap } from 'rxjs';
import { mockPatients } from '../models/patient.model';
import {convertDtoToPatient} from '../models/ikarus-patient.model';
import { RestPatientService } from './rest-patient.service';
import {toSignal} from "@angular/core/rxjs-interop";
import { InputParamsService } from './input-params.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly ikarusPatient$ = this.inputParamsService.queryParams$.pipe(
    switchMap(params =>
      this.restPatientService.getPatient(params.patientenId, params.iBSNR)
    ),
    shareReplay(1)
  );

  public readonly patient$ = this.ikarusPatient$.pipe(
    map(patient => patient ? convertDtoToPatient(patient) : undefined),
    shareReplay(1)
  );
  cPatient = toSignal(this.patient$);

  public readonly facility$ = this.ikarusPatient$.pipe(
    map(patient => patient?.Betriebstätte || ''),
    shareReplay(1)
  );

  public readonly patientList$ = this.inputParamsService.queryParams$.pipe(
    map(params => mockPatients.map(
      patient => ({
        link: '',
        queryParams: {patientenId: params.patientenId || '', iBSNR: params.iBSNR || ''},
        text: patient.lastName + ', ' + patient.firstName + '; ' + patient.dateOfBirth
      })
    )),
    shareReplay(1)
  );

  constructor(private readonly inputParamsService: InputParamsService,
              private readonly restPatientService: RestPatientService) {
  }
}
