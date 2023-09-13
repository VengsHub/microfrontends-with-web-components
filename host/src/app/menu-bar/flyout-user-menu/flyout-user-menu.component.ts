import { Component, EventEmitter, Output } from '@angular/core';
import { IconComponent } from '../../shared/components/icon.component';

@Component({
  selector: 'app-flyout-user-menu',
  templateUrl: './flyout-user-menu.component.html',
  styleUrls: ['./flyout-user-menu.component.scss'],
  imports: [
    IconComponent
  ],
  standalone: true
})
export class FlyoutUserMenuComponent {
  @Output() closeFlyoutMenu = new EventEmitter<void>;
}
