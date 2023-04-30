import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryStandaloneService {

  constructor() {
    console.log('service init');
  }
}
