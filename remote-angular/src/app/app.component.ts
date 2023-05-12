import { Component, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Example2Component } from './example2/example2.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    Example2Component
  ]
})
export class AppComponent {
  private _route = '';
  @Input() set route(route: string) {
    this._route = route;
    console.log('remote angular routing commencing to', this._route);
    this.router.navigate([this._route]);
  }

  title = 'remote-angular';

  constructor(private readonly router: Router) {
    console.log('component loaded');
  }
}
