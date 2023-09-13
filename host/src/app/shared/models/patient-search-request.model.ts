import { PatientStatus } from './patient-status.model';

export interface PatientSearchRequest { 
    /**
     * Sum of IBSNRs in which the patient data is to be searched
     */
    ibsnrArray: Array<string>;
    /**
     * First name of patient, may contain wildcard (*)
     */
    vorname?: string;
    /**
     * Last name of patient, may contain wildcard (*)
     */
    nachname?: string;
    /**
     * Date of birth
     */
    geburtsdatum?: string;
    status?: PatientStatus;
}



