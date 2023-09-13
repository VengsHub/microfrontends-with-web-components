import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { NavigationItem } from '../../shared/models/navigation-item.model';
import { RouterLink } from '@angular/router';
import {IconComponent} from "../../shared/components/icon.component";

@Component({
  selector: 'app-flyout-menu',
  standalone: true,
    imports: [
        NgFor,
        RouterLink,
        IconComponent
    ],
  providers: [
  ],
  templateUrl: './flyout-menu.component.html',
  styleUrls: ['./flyout-menu.component.scss']
})
export class FlyoutMenuComponent {
  @HostBinding('class.is-mobile') @Input() isMobile = false;
  @Input() navigationItems: NavigationItem[] = [];

  @Output() closeFlyoutMenu = new EventEmitter<void>;
}
