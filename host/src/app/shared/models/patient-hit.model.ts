import { Gender } from './gender.model';
import { Adresse } from './adresse.model';
import { PatientStatus } from './patient-status.model';

export interface PatientHit {
    vorname?: string;
    nachname?: string;
    geburtsdatum?: string;
    geschlecht?: Gender;
    adresse?: Adresse;
    status?: PatientStatus;
}



