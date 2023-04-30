import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-library-wc',
  template: `
    <p>
      library-wc works!
    </p>
  `,
  styles: [
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LibraryWcComponent {

}
