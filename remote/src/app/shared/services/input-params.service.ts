import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputParamsService {
  readonly sRestUrl = signal('api/');
  readonly restUrl$ = toObservable(this.sRestUrl);

  readonly sPatientenId = signal('106-1~8714');
  readonly patientenId$ = toObservable(this.sPatientenId);

  readonly sIBSNR = signal('49990071');
  readonly iBSNR$ = toObservable(this.sIBSNR);

  readonly queryParams$ = combineLatest([this.patientenId$, this.iBSNR$]).pipe(
    map(([patientenId, iBSNR]) => ({patientenId, iBSNR})),
    tap(e => console.log('query params', e))
  );
}
