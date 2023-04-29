import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';
import { AnotherComponent } from './another.component';

const routes: Routes = [
  {path: '', component: LibraryComponent},
  {path: 'another', component: AnotherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule {

}
