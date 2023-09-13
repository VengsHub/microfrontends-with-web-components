import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, of, switchMap, take} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {InputParamsService} from './input-params.service';
import {WidgetIframe} from "../models/widget-iframe.model";

@Injectable({
  providedIn: 'root'
})
export class SecondTabService {

  constructor(private readonly http: HttpClient, private readonly inputParamsService: InputParamsService) {
  }

  readonly secondTabContent$ = this.inputParamsService.restUrl$.pipe(
    switchMap(url => this.http.get<WidgetIframe | null>(url + 'second-tab/content', {observe: 'response'}).pipe(
      map(res => res.body),
      catchError(error => {
        console.error(error);
        return of(null);
      }),
      take(1)
    ))
  );

  cSecondTabContent = toSignal(this.secondTabContent$, {initialValue: null});
}
