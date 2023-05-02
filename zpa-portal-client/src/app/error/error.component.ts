import { Component, Input } from '@angular/core';
import {PortalError} from "../shared/models/portal-error.model";

export enum ErrorSite {
  Path = 'error'
}

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {
  @Input() error?: PortalError;
}
