import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable, shareReplay } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class RouteDataService {

  readonly currentRoute$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => (event as NavigationEnd).urlAfterRedirects),
    distinctUntilChanged(),
    shareReplay(1)
  );
  readonly cCurrentRoute = toSignal(this.currentRoute$, {initialValue: ''});

  readonly queryParams$: Observable<{patientenId: string, iBSNR: string}> = this.currentRoute$.pipe(
    map(route => new URLSearchParams(route.substring(1).split('?')[1])),
    map(paramMap => ({
      patientenId: paramMap.get('patientenId') || '106-1~8714',
      iBSNR: paramMap.get('iBSNR') || '49990071'
    })),
    shareReplay(1)
  );
  readonly cQueryParams = toSignal(this.queryParams$, {initialValue: {patientenId: '106-1~8714', iBSNR: '30000042'}});

  constructor(private readonly router: Router) {
  }
}
