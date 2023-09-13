import { Injectable, isDevMode } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';

export type LocalDevToken = {token_type: 'Bearer', access_token: string, expires_in: number, scope: 'sts'}

@Injectable({
  providedIn: 'root'
})
export class LocalDevTokenService {

  private http?: HttpClient;

  localDevToken$: Observable<LocalDevToken|undefined> = of(undefined);

  constructor(private readonly httpBackend: HttpBackend) {
    // need to use httpBackend here, as we need to avoid the circular dependency between interceptor, httpclient and this service
    this.http = new HttpClient(httpBackend);

    if (isDevMode()) {
      this.localDevToken$ = this.http.post<LocalDevToken>('http://localhost:8888/localdev/token',
        'client_id=mock_clientId&client_secret=mock_clientSecret&scope=sts&grant_type=client_credentials',
        {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
      ).pipe(
        shareReplay(1)
      );
    }
  }
}
