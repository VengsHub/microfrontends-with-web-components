import { Component, computed, ElementRef, untracked } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { IconComponent } from '../../../../../shared/components/icon.component';
import { UserInterfaceService } from '../../../../../shared/services/user-interface.service';

@Component({
  imports: [IconComponent, NgIf, DatePipe],
  selector: 'app-search-entry-context-menu',
  standalone: true,
  styleUrls: ['./search-entry-context-menu.component.scss'],
  templateUrl: './search-entry-context-menu.component.html'
})
export class SearchEntryContextMenuComponent {
  private readonly DISTANCE_TO_TOP = 288;

  cShouldOpenUpwards = computed(() => {
    if (this.userInterfaceService.cIsMobile()) return false;
    const contextMenuPositionY = this.elementRef.nativeElement.getBoundingClientRect().y;
    const distanceToWindowBottom = untracked(this.userInterfaceService.cWindowHeight) - contextMenuPositionY;
    return distanceToWindowBottom < 330;
  });

  cShouldPositionFixed = computed(() => {
    if (this.userInterfaceService.cIsMobile() || !this.cShouldOpenUpwards()) return false;
    const contextMenuPositionY = this.elementRef.nativeElement.getBoundingClientRect().y;
    const distanceToPatientSearchForm = contextMenuPositionY - 330 - this.DISTANCE_TO_TOP;
    return distanceToPatientSearchForm < 0;
  });

  constructor(readonly elementRef: ElementRef, readonly userInterfaceService: UserInterfaceService) {
  }
}
