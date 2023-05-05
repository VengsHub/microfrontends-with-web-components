import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  title = 'remote-angular';
}
