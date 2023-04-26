import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  test = 'http://127.0.0.1:8081/default-web-component.js';
  constructor() {
    // import(this.test).then(e => console.log('e', e));
  }
}
