import { Component } from '@angular/core';
import { LibraryStandaloneService } from './library-standalone.service';

@Component({
  selector: 'lib-library-standalone',
  standalone: true,
  template: `
    <p>
      library-standalone works!
    </p>
  `,
  styles: [
  ]
})
export class LibraryStandaloneComponent {
  constructor(private readonly libraryStandaloneService: LibraryStandaloneService) {
  }
}
