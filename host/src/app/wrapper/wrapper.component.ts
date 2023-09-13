import { Component, Input, ElementRef, OnInit, ViewChild, inject, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouteDataService } from '../shared/services/route-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TabManagementService } from '../shared/services/tab-management.service';
import { NavigationItemsService } from '../shared/services/navigation-items.service';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  @Input() patientenDoknr?: string;
  @Input() ibsnr?: string;
  @Input() dashboard?: string;
  @Input() title?: string;

  @ViewChild('container') container?: ElementRef;

  constructor(private readonly router: Router,
              private readonly routeDataService: RouteDataService,
              private readonly navigationItemsService: NavigationItemsService,
              private readonly tabService: TabManagementService) {
  }

  async ngOnInit() {
    await import('@patientenakte/zpa-portal-client/main.js');
    await import('@patientenakte/zpa-portal-client/polyfills.js');

    const zpaRoot = document.createElement('zpa-root');

    const zpaNavigationItem = this.navigationItemsService.cNavigationItems().find(item => item.name === 'zpa-test');
    if (zpaNavigationItem?.targetUrl) {
      zpaRoot.setAttribute('resturl', zpaNavigationItem.targetUrl);
    }

    this.routeDataService.currentRoute$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(route => {
      const currentZpaRoute = route.split('/').at(-1) || '';
      zpaRoot.setAttribute('route', currentZpaRoute);
    });

    zpaRoot.setAttribute('patientenid', this.routeDataService.cQueryParams().patientenId);
    zpaRoot.setAttribute('ibsnr', this.routeDataService.cQueryParams().iBSNR);

    zpaRoot.addEventListener('navigation', event => {
      const newRoute = (event as CustomEvent).detail;
      this.router.navigate(['patient' + newRoute]);
    });

    zpaRoot.addEventListener('patient', event => {
      const patient = (event as CustomEvent).detail;
      const name = patient.lastName + ', ' + patient.firstName;
      this.tabService.changeTabName(name);
    });

    if (this.container) {
      this.container.nativeElement.appendChild(zpaRoot);
    }
  }
}
