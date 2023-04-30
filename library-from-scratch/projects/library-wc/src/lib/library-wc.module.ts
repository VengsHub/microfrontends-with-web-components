import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { LibraryWcComponent } from './library-wc.component';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ]
})
export class LibraryWcModule {
  constructor(private injector: Injector) {
    // this doesn't get called when module gets imported in host
    console.log('library-wc loaded');
    const element = createCustomElement(LibraryWcComponent, {
      injector: this.injector,
    });

    customElements.define('wc-library', element);
  }
}
