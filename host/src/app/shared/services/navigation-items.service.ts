import { Injectable } from '@angular/core';
import { RestNavigationService } from './rest-services/rest-navigation.service';
import { Observable, shareReplay } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationItem } from '../models/navigation-item.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationItemsService {
  readonly navigationsItems$: Observable<NavigationItem[]> = this.restNavigationService.getNavigationItems().pipe(
    shareReplay(1),
  );
  readonly cNavigationItems = toSignal(this.navigationsItems$, {initialValue: [] as NavigationItem[]});

  constructor(private readonly restNavigationService: RestNavigationService) {
  }
}
