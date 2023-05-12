import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  readonly beforeNav = this.router.events.pipe(
    filter(event => event instanceof NavigationStart)
  );

  constructor(private readonly router: Router) {
    // commenting this in overwrites the whole project routing???
    // rename to loadRemote
    // loadModule('./assets/remote-angular.js').then(e =>
    //   document.body.appendChild(document.createElement('wc-example'))
    // );
    // loadModule('./assets/remote-vue.js')
    // .then(() => document.body.appendChild(document.createElement('vue-web-component')));
    //
    // loadModule('./assets/zpa-portal.js')
    // .then(() => document.body.appendChild(document.createElement('zpa-portal-client')));
    this.importRemote();
  }

  async importRemote(): Promise<void> {
    await loadModule('./assets/remote-angular.js');
    const remoteElementAngular = document.createElement('remote-app-component');
    // @ts-ignore
    // remoteElementAngular.route = 'example';
    document.body.appendChild(remoteElementAngular);
  }
}
