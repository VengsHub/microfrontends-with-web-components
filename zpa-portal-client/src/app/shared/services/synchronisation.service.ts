import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, switchMap, take, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SynchronisationService {
  private readonly apiBaseUrl = 'api/';
  private readonly url = `${this.apiBaseUrl}admin/synchronisation`;

  private readonly syncInterval$ = this.http.get<number>(this.url, {observe: 'response'}).pipe(
    take(1),
    map(res => res.body || 60000)
  );

  readonly intervalTimer$ = this.syncInterval$.pipe(
    switchMap(interval => timer(1, interval)),
    shareReplay(1)
  );

  constructor(private readonly http: HttpClient) {
  }
}
