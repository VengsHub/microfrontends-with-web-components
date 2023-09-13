import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PatientHeaderComponent} from "./patient-header.component";
import {DataService} from "../shared/services/data.service";
import {AsyncPipe, DatePipe, JsonPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TabBarComponent} from "../tab-bar/tab-bar.component";
import {AgePipe} from "../shared/pipes/age.pipe";
import {mockPatients} from "../shared/models/patient.model";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";

describe('PatientHeaderComponent', () => {
  let service: DataService;
  let component: PatientHeaderComponent;
  let fixture: ComponentFixture<PatientHeaderComponent>;

  const MockRestPatientDataService = {
    patient$ : of(mockPatients[0]),
    cPatient: () => mockPatients[0],
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AsyncPipe,
        JsonPipe,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        NgIf,
        DatePipe,
        NgOptimizedImage,
        TabBarComponent,
        AgePipe,
      ],
      providers: [
        {provide: DataService, useValue: MockRestPatientDataService},
      ]
    })
    service = TestBed.inject(DataService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should diplay patient data',() => {
    const expectedPatient = service.cPatient();
    const infoElement = fixture.debugElement.query(By.css('.patient-info')).nativeElement;
    expect(infoElement.textContent).toContain(expectedPatient?.street);
    expect(infoElement.textContent).toContain(expectedPatient?.postalCode);
    expect(infoElement.textContent).toContain(expectedPatient?.city);
  });

});
