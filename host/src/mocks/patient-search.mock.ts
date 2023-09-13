import { PatientHit, PatientSearchResponse } from "../../generated/openapi";

type MockHits = Omit<PatientHit, "status"|"geschlecht"> & {status: string, geschlecht: string};
type MockPatientSearchResponse = Omit<PatientSearchResponse, "hits"> & {hits: MockHits[]};
export const PatientSearchResultsMock: MockPatientSearchResponse = {
  "hits": [
    {
      "vorname": "Jascha",
      "nachname": "Lehmann",
      "geburtsdatum": "1967-06-07",
      "status": "AKTIV",
      "geschlecht": "U",
      "adresse": {
        "strasse": "Mockstraße",
        "hausnummer": "123",
        "plz": "12345",
        "ort": "Mockhausen"
      }
},
    {
      "vorname": "Maggie",
      "nachname": "Lehmann",
      "geburtsdatum": "1923-02-03",
      "status": "AKTIV",
      "geschlecht": "D"
    },
    {
      "vorname": "Mathias",
      "nachname": "Lehmann",
      "geburtsdatum": "1923-02-03",
      "status": "AKTIV",
      "geschlecht": "D"
    },
    {
      "vorname": "Nadine",
      "nachname": "Lehmann",
      "geburtsdatum": "2013-11-12",
      "status": "AKTIV",
      "geschlecht": "U"
    },
    {
      "vorname": "Nadine",
      "nachname": "Lehmann",
      "geburtsdatum": "1978-07-08",
      "status": "AKTIV",
      "geschlecht": "D"
    }
  ],
  "totalAmount": 5
}

export const validPatientSearchRequestMock = {
  ibsnrArray: ['12345'],
  vorname: 'Jascha'
}

export const unfindableValidPatientSearchRequestMock = {
  ibsnrArray: ['12345'],
  vorname: 'Jens'
}

export const invalidPatientSearchRequestMock = {
  ibsnrArray: ['12345'],
  vorname: 'x',
  nachname: 'y'
}
