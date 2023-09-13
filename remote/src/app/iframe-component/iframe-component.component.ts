import { Component, computed, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import {WidgetIframe} from "../shared/models/widget-iframe.model";
import {SafeUrlPipe} from "../shared/pipes/safe-url.pipe";
import { UserInterfaceService } from '../shared/services/user-interface.service';

@Component({
  selector: 'app-iframe-component',
  standalone: true,
  imports: [NgIf, SafeUrlPipe],
  templateUrl: './iframe-component.component.html',
  styleUrls: ['./iframe-component.component.scss']
})
export class IframeComponentComponent {
  @Input() iframe?: WidgetIframe;

  readonly cIFrameHeight = computed(() => {
    const menuHeight = 105;
    const cardPadding = 48;
    const hcpMenuHeight = 48;
    return this.userInterfaceService.cWindowHeight() - menuHeight - cardPadding - hcpMenuHeight;
  });

  constructor(private readonly userInterfaceService: UserInterfaceService) {
  }
}
