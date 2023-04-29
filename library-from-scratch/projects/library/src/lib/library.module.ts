import { NgModule } from '@angular/core';
import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { AnotherComponent } from './another.component';
@NgModule({
  declarations: [
    LibraryComponent,
    AnotherComponent
  ],
  imports: [
    LibraryRoutingModule
  ],
  exports: [
    LibraryComponent,
    LibraryRoutingModule,
    AnotherComponent
  ]
})
export class LibraryModule {
  constructor() {
    console.log('library loaded');
  }
}
