import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavigationItemsService } from './shared/services/navigation-items.service';
import { map } from 'rxjs';
import { WrapperComponent } from './wrapper/wrapper.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';

export const permissionGuard = (route: ActivatedRouteSnapshot) => {
  const navigationItemsService = inject(NavigationItemsService);
  const router = inject(Router);
  const routedPath = '/' + route.url[0].path;

  return navigationItemsService.navigationsItems$.pipe(
    map(items => {
      const allowedRoutes = items.map(item => item.urlPattern);
      return allowedRoutes.includes(routedPath) || router.parseUrl('');
    })
  );
};

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'patient', redirectTo: 'patient/master-data', pathMatch: 'full'},
  {path: 'patient/:dashboard', data: {title: 'zPA'}, component: WrapperComponent},
  {path: 'kalender', component: PlaceholderComponent, canActivate: [permissionGuard]},
  {path: 'dokumente', component: PlaceholderComponent, canActivate: [permissionGuard]},
  {path: 'abrechnung', component: PlaceholderComponent, canActivate: [permissionGuard]},
  {path: 'stammdaten', component: PlaceholderComponent, canActivate: [permissionGuard]},
  {path: 'berichtswesen', component: PlaceholderComponent, canActivate: [permissionGuard]},
  {path: '**', redirectTo: ''}
];
