import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pre-root',
  template: `<router-outlet></router-outlet>`,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class RootComponent {
  constructor() {  }
}
