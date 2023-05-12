import { inject, Injectable, NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  UrlTree
} from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { Observable, of } from 'rxjs';

// this guard blocks routing from host but not from remote angular web component...
class CanDeactivate {
  constructor() {}

  canDeactivate(): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    console.log('can deactivate?');
    return of(false);
  }
}

const routes: Routes = [
  {path: '', component: DefaultComponent, canDeactivate: [() => inject(CanDeactivate).canDeactivate()]},
  {path: 'example', component: DefaultComponent},
  {
    path: 'library', loadChildren: () => import('library').then(m => {
      console.log('m', m.LibraryModule);
      return m.LibraryModule;
    })
  },
  {
    path: 'standalone', loadComponent: () => import('library-standalone').then(m => m.LibraryStandaloneComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanDeactivate]
})
export class AppRoutingModule {

  constructor() {
  }
}
