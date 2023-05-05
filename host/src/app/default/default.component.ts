import { Component } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  constructor() {
    // commenting this in overwrites the whole project routing???
    loadModule('./assets/remote-angular.js').then(e => console.log('mkmk', e));
    loadModule('./assets/remote-vue.js')
    .then(() => document.body.appendChild(document.createElement('vue-web-component')));

    loadModule('./assets/zpa-portal.js')
    .then(() => document.body.appendChild(document.createElement('zpa-portal-client')));
  }
}
