import { computed, Injectable, signal, } from '@angular/core';
import {
  filter,
  fromEvent,
  map, timeInterval
} from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { PatientHit } from '../models/patient-hit.model';

@Injectable({
  providedIn: 'root',
})
export class UserInterfaceService {

  sPatientSearchContextMenuData = signal<PatientHit | undefined>(undefined);

  sPatientSearchScrollDirection = signal<'scrollUp' | 'scrollDown' | 'idle'>('idle');
  patientSearchScrollDirection$ = toObservable(this.sPatientSearchScrollDirection).pipe(
    timeInterval(),
    // filters out frequent/automatic scrolls
    filter(userScroll => userScroll.interval > 100),
    map(userScroll => userScroll.value)
  );
  cPatientSearchScrollDirection = toSignal(this.patientSearchScrollDirection$);

  private windowWidth$ = fromEvent(window, 'resize').pipe(
    map(event => (event.target as Window).innerWidth)
  );
  readonly cWindowWidth = toSignal(this.windowWidth$, {initialValue: window.innerWidth});
  readonly cIsMobile = computed(() => this.cWindowWidth() <= 480);

  private windowHeight$ = fromEvent(window, 'resize').pipe(
    map(event => (event.target as Window).innerHeight)
  );
  readonly cWindowHeight = toSignal(this.windowHeight$, {initialValue: window.innerHeight});
}
