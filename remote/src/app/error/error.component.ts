import { Component, Input } from '@angular/core';
import {PortalError} from "../shared/models/portal-error.model";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf} from "@angular/common";

export enum ErrorSite {
  Path = 'error'
}

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    NgIf,
  ],
})
export class ErrorComponent {
  @Input() error?: PortalError;
}
