import { Component, HostListener } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe, NgOptimizedImage } from "@angular/common";
import { SearchEntryComponent } from "./search-entry/search-entry.component";
import { IconComponent } from '../../../shared/components/icon.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { PatientSearchService } from '../../../shared/services/patient-search.service';
import { UserInterfaceService } from '../../../shared/services/user-interface.service';

@Component({
  selector: 'app-patient-search-results',
  templateUrl: './patient-search-results.component.html',
  styleUrls: ['./patient-search-results.component.scss'],
  standalone: true,
  imports: [
    NgOptimizedImage,
    AsyncPipe,
    JsonPipe,
    CommonModule,
    SearchEntryComponent,
    IconComponent,
    SpinnerComponent,
  ]
})
export class PatientSearchResultsComponent {
  private lastScrollTop = 0;
  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    if((this.patientSearchService.cPatients()?.hits ?? []).length <= 5 && !this.userInterfaceService.cIsMobile()) return
    const currentScrollTop = (event.target as Element).scrollTop;
    if (currentScrollTop > this.lastScrollTop) {
      this.userInterfaceService.sPatientSearchScrollDirection.set('scrollDown');
    } else {
      this.userInterfaceService.sPatientSearchScrollDirection.set('scrollUp');
    }
    this.lastScrollTop = currentScrollTop;
  }

  constructor(readonly patientSearchService: PatientSearchService, public userInterfaceService: UserInterfaceService) {
  }
}
