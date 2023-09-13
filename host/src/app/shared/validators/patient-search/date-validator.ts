import { AbstractControl, ValidationErrors } from '@angular/forms';

export function DateValidator(control: AbstractControl): ValidationErrors | null {

  if(!control || control?.value?.length < 1)  return null;

  const value = control.value;
  const errors: {[key: string]: string} = {};

  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  const inputDate = new Date((value ?? '').split('.').reverse().join('/'));
  const currentDate = new Date();

  if (!dateRegex.test(value)) {
    errors['invalidFormat'] = 'Achten Sie auf das korrekte Datumsformat (TT.MM.JJJJ).';
  }

  if (inputDate > currentDate) {
    errors['isFutureDate'] = 'Das angegebene Datum liegt in der Zukunft.';
  }

  if (isNaN(inputDate.getTime())) {
    errors['invalidDate'] = 'Invalides Datum.';
  }
  return Object.keys(errors).length ? errors : null;
}
