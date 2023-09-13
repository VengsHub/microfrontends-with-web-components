import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DatePipe, LowerCasePipe, NgIf } from '@angular/common';
import { SearchEntryContextMenuComponent } from './search-entry-context-menu/search-entry-context-menu.component';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import { IconComponent } from '../../../../shared/components/icon.component';
import { UserInterfaceService } from '../../../../shared/services/user-interface.service';
import { PatientHit } from '../../../../shared/models/patient-hit.model';

@Component({
  selector: 'app-search-entry',
  templateUrl: './search-entry.component.html',
  styleUrls: ['./search-entry.component.scss'],
  standalone: true,
  imports: [SearchEntryContextMenuComponent, IconComponent, NgIf, DatePipe, LowerCasePipe, ClickOutsideDirective]
})
export class SearchEntryComponent {
  @Input() patient?: PatientHit;
  @ViewChild('contextButtonRef') contextButton?: ElementRef |  undefined;
  isMenuOpen = false;

  constructor(readonly userInterfaceService: UserInterfaceService) {  }

  toggleMenu() {
    if (this.userInterfaceService.cIsMobile()) {
      this.userInterfaceService.sPatientSearchContextMenuData.set(this.patient);
    } else {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
