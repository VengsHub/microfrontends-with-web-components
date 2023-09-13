import { PatientHit } from './patient-hit.model';

export interface PatientSearchResponse {
    hits: Array<PatientHit>;
    totalAmount: number;
}

