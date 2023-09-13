import { Component, HostListener } from '@angular/core';
import { UserInterfaceService } from '../../services/user-interface.service';

import { NgIf } from '@angular/common';
import { sheetAnimation } from '../../../../animations';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import {
  SearchEntryContextMenuComponent
} from '../../../menu-bar/flyout-search/patient-search-results/search-entry/search-entry-context-menu/search-entry-context-menu.component';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
  standalone: true,
  imports: [SearchEntryContextMenuComponent, NgIf, ClickOutsideDirective],
  animations: [sheetAnimation]
})
export class SheetComponent {
  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    event.stopPropagation();
  }

  constructor(readonly userInterfaceService: UserInterfaceService) {
  }
}
