import {NgModule} from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCake } from '@fortawesome/pro-solid-svg-icons';

@NgModule({
  imports: [
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class IconsModule {
  constructor(private readonly library: FaIconLibrary) {
    library.addIcons(faCake);
  }
}
