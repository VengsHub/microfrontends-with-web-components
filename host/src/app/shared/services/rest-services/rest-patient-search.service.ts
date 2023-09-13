import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { PatientSearchResponse } from '../../models/patient-search-response.model';
import { PatientSearchRequest } from '../../models/patient-search-request.model';

@Injectable({
  providedIn: 'root'
})
export class RestPatientSearchService {
  private apiBaseUrl = 'api/';

  constructor(private readonly http: HttpClient) {
  }

  searchPatients(request: PatientSearchRequest): Observable<PatientSearchResponse> {
    const url = `${this.apiBaseUrl}patienten/search`;
    return this.http
    .post<PatientSearchResponse>(url, request, {observe: 'response'})
    .pipe(
      map(result => result.body || {hits: [], totalAmount: 0}),
      catchError(error => {
        console.error('error', error);
        return of({hits: [], totalAmount: 0});
      })
    );
  }
}
