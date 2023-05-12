import { Routes } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { Example2Component } from './example2/example2.component';

export const routes: Routes = [
  {path: '', redirectTo: 'example', pathMatch: 'full'},
  {path: 'example', component: ExampleComponent},
  {path: 'example2', component: Example2Component}
];
