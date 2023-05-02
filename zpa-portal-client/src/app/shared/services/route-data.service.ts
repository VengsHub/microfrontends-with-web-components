import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import {distinctUntilChanged, filter, map, Observable, shareReplay} from 'rxjs';
import { DashboardTab } from '../models/dashboard-widget.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class RouteDataService {

  readonly activeDashboardTab$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => event as NavigationEnd),
    map(event => event.url.substring(1).split('?')[0] as DashboardTab),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public readonly queryParams$: Observable<{patientenId: string, iBSNR: string}> = this.activatedRoute.queryParamMap.pipe(
    map(paramMap => ({
      patientenId: paramMap.get('patientenId') || '',
      iBSNR: paramMap.get('iBSNR') || ''
    })),
    filter(params => {
      const paramsExist = !!params.patientenId && !!params.iBSNR;
      if (!paramsExist) {
        this.errorService.newError({
          affectedService: 'Portal',
          code: '404',
          technicalDescription: 'Die patientenId und/oder iBSNR sind in den Query Parameter der URL nicht vorhanden',
          timeOfOccurrence: (new Date()).toLocaleString(),
          userAccount: '',
          verboseDescription: 'Aus diesem Termin wurde kein "Patienten ID" übergeben. ' +
            'Bitte stellen Sie sicher, dass der Patient in DISweb angelegt und mit dem Patienten aus dem Termin zusammengeführt ist ("Merge Funktion").' +
            ' Erhalten Sie diese Meldung trotz vorhandenem Parameter, melden Sie die Störung bitte unter Angabe der unten stehenden ' +
            'Supportinformationen an das Service-Desk (06102-359945 / service-desk@kpark.de).'
        }, true);
      }
      return paramsExist;
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );

  readonly windowBackAndForwardEvents$ = this.router.events.pipe(
    filter(event => event instanceof NavigationStart && event.navigationTrigger === 'popstate')
  );

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly errorService: ErrorService) {
    // should route when patient data in url changes
    router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
