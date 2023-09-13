import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FlyoutSearchComponent } from './flyout-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchComponent', () => {
  let component: FlyoutSearchComponent;
  let fixture: ComponentFixture<FlyoutSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(FlyoutSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have correct initial values', () => {
    expect((Object.values(component.status) ?? []).map((entry) => entry.value)).toEqual(['Aktiv', 'Inaktiv', 'Alle']);
    expect(component.patientSearchForm.value).toEqual({
      geburtsdatum: '',
      nachname: '',
      status: 'Aktiv',
      vorname: ''
    });
  });

  it('should prevent non-digit inputs', () => {
    const event = new KeyboardEvent('keydown', {key: 'a'});
    const spy = jest.spyOn(event, 'preventDefault');
    component.preventNonDigitInputs(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should not prevent digit inputs', () => {
    const event = new KeyboardEvent('keydown', {key: '1'});
    const spy = jest.spyOn(event, 'preventDefault');
    component.preventNonDigitInputs(event);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should append dot after second and fifth character', () => {
    const inputEvent: Partial<InputEvent> = {
      data: '1',
    };

    component.patientSearchForm.controls.geburtsdatum.setValue('12');
    component.handleDateFieldInput(<InputEvent>inputEvent);
    expect(component.patientSearchForm.controls.geburtsdatum.value).toEqual('12.');

    component.patientSearchForm.controls.geburtsdatum.setValue('12.08');
    component.handleDateFieldInput(<InputEvent>inputEvent);
    expect(component.patientSearchForm.controls.geburtsdatum.value).toEqual('12.08.');
  });

  it('should not append dot if last key was backspace', () => {
    const inputEvent: Partial<InputEvent> = {
      data: null, // backspace doesn't add any data
    };

    component.patientSearchForm.controls.geburtsdatum.setValue('12');
    component.handleDateFieldInput(<InputEvent>inputEvent);
    expect(component.patientSearchForm.controls.geburtsdatum.value).toEqual('12');
  });

  it('should reset form group and results from service', () => {
    const spy = jest.spyOn(component['patientSearchService'].resetResult$, 'next');

    component.resetFormGroup();

    expect(component.patientSearchForm.value).toEqual({
      geburtsdatum: null,
      nachname: null,
      vorname: null,
      status: 'Alle'
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should clean single input and trigger search', () => {
    const spy = jest.spyOn(component['patientSearchService'].resetResult$, 'next');

    component.patientSearchForm.controls.vorname.setValue('Jan');
    component.clearInputAndTriggerNewSearch('vorname');
    expect(component.patientSearchForm.controls.vorname.value).toEqual('');
    expect(spy).toHaveBeenCalled();
  });

  it('should search for patient', () => {
    const spy = jest.spyOn(component['patientSearchService'], 'searchPatients');
    component.patientSearchForm.controls.vorname.setValue('Jan');
    component.searchPatient();
    expect(spy).toHaveBeenCalledWith({ vorname: 'Jan', status: 'Aktiv' });
  });

  it('should trigger patient search with valid form', fakeAsync(() => {
    const spy = jest.spyOn(component, 'searchPatient');

    component.patientSearchForm.controls.vorname.setValue('Jan');
    tick(1500);
    expect(spy).toHaveBeenCalled();
  }));

  it('should not trigger patient search with invalid date', fakeAsync(() => {
    const spy = jest.spyOn(component['patientSearchService'], 'searchPatients');
    component.patientSearchForm.controls.geburtsdatum.setValue('41.11.2999');
    tick(1500);
    expect(spy).toHaveBeenCalledTimes(0);
  }));
});
