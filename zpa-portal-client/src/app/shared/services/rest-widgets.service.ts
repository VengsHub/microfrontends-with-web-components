import { Injectable } from '@angular/core';
import { DashboardTab, DashboardWidget } from '../models/dashboard-widget.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Widget } from '../models/widget.model';
import { AlertService } from './alert/alert-service';

@Injectable({
  providedIn: 'root'
})
export class RestWidgetsService {

  apiBaseUrl = 'api/';

  constructor(private readonly http: HttpClient,
              private readonly alertService: AlertService) {
  }

  getAvailableWidgets(): Observable<Widget[]> {
    const url = `${this.apiBaseUrl}dashboard-configuration/widget-overview`;
    return this.http
    .get<Widget[]>(url, {observe: 'response'})
    .pipe(
      map(result => result.body || []),
      catchError(error => this.handleErrorResponse<Widget[]>(error))
    );
  }

  getDashboardWidgets(tab: DashboardTab): Observable<DashboardWidget[]> {
    const url = `${this.apiBaseUrl}dashboard/${tab}/widgets`;
    return this.http
    .get<DashboardWidget[]>(url, {observe: 'response'})
    .pipe(
      map(result => result.body || []),
      catchError(error => this.handleErrorResponse<DashboardWidget[]>(error))
    );
  }

  save(widgets: DashboardWidget[], tab: DashboardTab): Observable<DashboardWidget[]> {
    const url = `${this.apiBaseUrl}dashboard/${tab}/widgets`;
    return this.http.put<DashboardWidget[]>(url, widgets, {observe: 'response'})
    .pipe(
      map(result => result.body || []),
      catchError(error => this.handleErrorResponse<DashboardWidget[]>(error))
    );
  }

  private handleErrorResponse<Type>(error: HttpErrorResponse): Observable<Type> {
    // currently no warning toast necessary as we always navigate to error page on error (interceptor)
    // this.alertService.warningToast('Die Speicherung ist fehlgeschlagen weil die Verbindung unterbrochen wurde.' + `${error.message}`);
    return new Observable<Type>();
  }
}
