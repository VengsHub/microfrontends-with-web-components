import { Patient } from './patient.model';


export interface IkarusPatient {
  /**
   * The ID of a patient
   */
  Doknr: string;
  /**
   * The iBSNR
   */
  Zentrum: string;
  /**
   * Name of the facility
   */
  Betriebstätte: string;
  /**
   * First name of patient
   */
  Vorname: string;
  /**
   * Last name of patient
   */
  Nachname: string;
  /**
   * Date of birth
   */
  Geburtsdatum?: string;

  Adresse: Adresse;

  Geschlecht: string;

  Caveats: Array<string>;
}

export interface Adresse {
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
}

export const mockIkarusPatient = {
  Doknr: '1234',
  Zentrum: '5678',
  Betriebstätte: 'test',
  Vorname: 'Max',
  Nachname: 'Mustermann',
  Geburtsdatum: '01/17/1960 00:00:00',
  Geschlecht: 'W',
  Adresse: {
    strasse: 'Musterstr.',
    hausnummer: '7',
    plz: '12345',
    ort: 'Berlin'
  },
  Caveats: ['Hausstaub']
}

export const mockIkarusPatientAsPatient = {
  patientenId: '1234',
  firstName: 'Max',
  lastName: 'Mustermann',
  gender: 'W',
  dateOfBirth: '01/17/1960 00:00:00',
  street: 'Musterstr. 7',
  postalCode: '12345',
  city: 'Berlin',
  country: 'unknown',
  phoneNumber: '+49??? ????????',
  email: '???.???@???.??',
  insurance: '???? Krankenkasse',
  caveats: 'Hausstaub'
}

export function convertDtoToPatient(ikarusPatient: IkarusPatient): Patient {
  return {
    patientenId: ikarusPatient.Doknr ?? 'unknown',
    firstName: ikarusPatient.Vorname ?? 'unknown',
    lastName: ikarusPatient.Nachname ?? 'unknown',
    gender: ikarusPatient.Geschlecht ?? 'unknown',
    dateOfBirth: ikarusPatient.Geburtsdatum ?? 'unknown',
    street: `${ikarusPatient.Adresse?.strasse ?? 'unknown'} ${ikarusPatient.Adresse?.hausnummer ?? 'unknown'}`,
    postalCode: ikarusPatient.Adresse?.plz ?? 'unknown',
    city: ikarusPatient.Adresse?.ort ?? 'unknown',
    country: 'unknown',
    phoneNumber: '+49??? ????????',
    email: '???.???@???.??',
    insurance: '???? Krankenkasse',
    caveats: ikarusPatient.Caveats?.join(', ') ?? 'unknown'
  }
}
