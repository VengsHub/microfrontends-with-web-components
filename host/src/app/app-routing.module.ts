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
