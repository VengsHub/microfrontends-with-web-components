import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InputParamsService } from './shared/services/input-params.service';
import { RouteDataService } from './shared/services/route-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppComponent } from './app.component';
import { Patient } from './shared/models/patient.model';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-pre-root',
  template: `<app-root></app-root>`,
  standalone: true,
  imports: [
    AppComponent
  ]
})
export class RootComponent {

  @Input() set route(route: string) {
    if (route) {
      this.router.navigate([route], {skipLocationChange: true});
    }
  }

  @Input() set resturl(restUrl: string) {
    if (restUrl) {
      this.inputParamsService.sRestUrl.set(restUrl);
    }
  }

  @Input() set patientenid(patientenId: string) {
    if (patientenId) {
      this.inputParamsService.sPatientenId.set(patientenId);
    }
  }

  @Input() set ibsnr(iBSNR: string) {
    if (iBSNR) {
      this.inputParamsService.sIBSNR.set(iBSNR);
    }
  }

  @Output() navigation = new EventEmitter<string>();
  @Output() patient = new EventEmitter<Patient>();

  constructor(private readonly inputParamsService: InputParamsService,
              private readonly routeDataService: RouteDataService,
              private readonly router: Router,
              private readonly dataService: DataService) {
    routeDataService.currentRoute$.pipe(takeUntilDestroyed()).subscribe(route => {
      this.navigation.emit(route);
    });
    dataService.patient$.pipe(takeUntilDestroyed()).subscribe(patient => {
      this.patient.emit(patient);
    });
  }
}
