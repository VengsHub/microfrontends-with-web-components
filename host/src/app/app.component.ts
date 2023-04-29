import { Component } from '@angular/core';
// import './default-web-component'; - and in html <default-web-component></default-web-component> also works

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'host';
  test = './assets/default-web-component.js';

  constructor() {
    // @ts-ignore
    // const element = loadModule('./assets/default-web-component.js')
    // .then(() => document.body.appendChild(document.createElement('default-web-component')));
  }
}
