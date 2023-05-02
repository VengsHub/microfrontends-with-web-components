import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { AlertService } from './alert/alert-service';
import { IkarusPatient } from '../models/ikarus-patient.model';

@Injectable({
  providedIn: 'root'
})
export class RestPatientService {

  apiBaseUrl = 'api/';

  constructor(private readonly http: HttpClient,
              private readonly alertService: AlertService) {
  }

  getPatient(patientenId: string, iBSNR: string): Observable<IkarusPatient|null> {
    const url = `${this.apiBaseUrl}patient/${patientenId}/${iBSNR}`;
    return this.http.get<IkarusPatient|null>(url, {observe: 'response'}).pipe(
      map(result => result.body),
      catchError(error => this.handleErrorResponse<IkarusPatient>(error))
    );
  }

  private handleErrorResponse<Type>(error: HttpErrorResponse): Observable<Type> {
    // currently no warning toast necessary as we always navigate to error page on error (interceptor)
    // this.alertService.warningToast('Die Speicherung ist fehlgeschlagen weil die Verbindung unterbrochen wurde.' + `${error.message}`);
    return new Observable<Type>();
  }
}
