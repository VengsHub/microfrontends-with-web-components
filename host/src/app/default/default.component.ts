import { Component } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  constructor() {
    // commenting this in overwrites the whole project routing???
    // const element = loadModule('./assets/remote-angular.js').then(e => console.log('mkmk', e));
  }
}
