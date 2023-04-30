import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';

const routes: Routes = [
  {path: '', component: DefaultComponent},
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
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() {
  }
}
