import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { NavigationItem } from '../../models/navigation-item.model';

@Injectable({
  providedIn: 'root'
})
export class RestNavigationService {
  private apiBaseUrl = 'api/';

  constructor(private readonly http: HttpClient) {
  }

  getNavigationItems(): Observable<NavigationItem[]> {
    const url = `${this.apiBaseUrl}navigation/items`;
    return this.http
    .get<NavigationItem[]>(url, {observe: 'response'})
    .pipe(
      map(result => result.body || []),
      catchError(error => {
        console.error('error', error);
        return [];
      })
    );
  }
}
