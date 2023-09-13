import { AfterViewInit, Component, computed, ElementRef, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { PatientFormParams, PatientSearchService } from '../../shared/services/patient-search.service';
import { AsyncPipe, DatePipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { debounce, merge, Subject, timer } from 'rxjs';
import { IconComponent } from '../../shared/components/icon.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { DateValidator } from '../../shared/validators/patient-search/date-validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SelectComponent } from '../../shared/components/select/select.component';
import { UserInterfaceService } from '../../shared/services/user-interface.service';
import { PatientSearchResultsComponent } from './patient-search-results/patient-search-results.component';
import { PatientStatus } from '../../shared/models/patient-status.model';

@Component({
  selector: 'app-flyout-search',
  templateUrl: './flyout-search.component.html',
  styleUrls: ['./flyout-search.component.scss'],
  imports: [
    ReactiveFormsModule,
    PatientSearchResultsComponent,
    AsyncPipe,
    NgIf,
    NgFor,
    IconComponent,
    SpinnerComponent,
    SelectComponent,
    DatePipe,
    NgOptimizedImage,
  ],
  providers: [PatientSearchService],
  standalone: true
})
export class FlyoutSearchComponent implements AfterViewInit {
  @ViewChild('nachnameInput') nachnameInput?: ElementRef;
  cCollapseSearchWrapper = computed(() => {
    return this.userInterfaceService.cIsMobile() && this.userInterfaceService.cPatientSearchScrollDirection() === 'scrollDown';
  });

  readonly status = [
    {label: 'Aktiv', value: 'Aktiv'},
    {label: 'Inaktiv', value: 'Inaktiv'},
    {label: 'Alle', value: 'Alle'}
  ];

  patientSearchForm = new FormGroup({
    vorname: new FormControl(''),
    nachname: new FormControl(''),
    geburtsdatum: new FormControl('', {validators: [DateValidator], updateOn: 'change'}),
    status: new FormControl('Aktiv')
  });

  readonly manualSearchPatientTrigger$: Subject<void> = new Subject<void>();
  private readonly debouncedFormValueChange$ = this.patientSearchForm.valueChanges.pipe(
    debounce(() => timer(1000))
  );

  private readonly patientSearchTriggers$ = merge(this.manualSearchPatientTrigger$, this.debouncedFormValueChange$);

  sFilteredFormValues = signal<PatientFormParams>(
    {nachname: '', vorname: '', geburtsdatum: '', status: PatientStatus.Aktiv}
  );
  cFormattedFormValues = computed(() => {
    const formattedFormValues = {
      ...this.sFilteredFormValues(),
      status: this.sFilteredFormValues().status?.toLowerCase()
    };
    return Object.values(formattedFormValues).join(', ');
  });

  constructor(
    private readonly patientSearchService: PatientSearchService,
    readonly userInterfaceService: UserInterfaceService
  ) {
    this.patientSearchTriggers$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.searchPatient();
    });
  }

  ngAfterViewInit() {
    this.nachnameInput?.nativeElement.focus();
  }

  searchPatient() {
    if (this.patientSearchForm.valid) {
      const formValues = this.patientSearchForm.value;
      const filteredFormValues =
        Object.fromEntries(Object.entries(formValues).filter(([_key, value]) => !!value)) as PatientFormParams;
      this.sFilteredFormValues.set(filteredFormValues);
      this.patientSearchService.searchPatients(filteredFormValues);
    }
  }

  resetFormGroup() {
    this.patientSearchForm.reset();
    this.patientSearchForm.controls.status.setValue('Alle');
    this.patientSearchForm.markAsPristine();
    this.patientSearchForm.markAsUntouched();
    this.patientSearchService.resetResult$.next();
  }

  clearInputAndTriggerNewSearch(formId: string) {
    this.patientSearchService.resetResult$.next();
    this.patientSearchForm.get(formId)?.setValue('');
    this.manualSearchPatientTrigger$.next();
    this.patientSearchForm.get(formId)?.markAsPristine();
    this.patientSearchForm.get(formId)?.markAsUntouched();
  }

  uncollapse(event: Event) {
    event.stopPropagation();
    this.userInterfaceService.sPatientSearchScrollDirection.set('idle');
  }

  // prevents letters and symbols, allows digits, dots, enter, backspace etc.
  preventNonDigitInputs(event: KeyboardEvent) {
    const digitRegex = /\d/;

    if (event.key !== '.' && event.key.length === 1 && !digitRegex.test(event.key)) {
      event.preventDefault();
    }
  }

  // adds dots to input when necessary (after second and fourth digit)
  // covered edge case: should not add dot if last key was backspace
  handleDateFieldInput(event: Event) {
    const inputEvent = event as InputEvent;
    const dateField = this.patientSearchForm.controls.geburtsdatum;
    if (dateField.value?.length === 2 || dateField.value?.length === 5) {
      const pressedKey = inputEvent.data;

      if (pressedKey) {
        dateField.setValue(dateField.value + '.');
      }
    }
  }
}
