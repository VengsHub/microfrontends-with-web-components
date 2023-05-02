import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { ErrorService } from '../shared/services/error.service';
import { FeaturesService } from '../shared/services/features.service';
import { DragAndDropService } from '../shared/services/drag-and-drop.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardTab } from '../shared/models/dashboard-widget.model';
import { AppComponent } from '../app.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { KparkComponentsModule } from '@kpark/zpa-components';
import { AlertService } from '../shared/services/alert/alert-service';
import { ToastNoAnimationModule, ToastrService } from 'ngx-toastr';
import {TranslateLoader, TranslateModule, TranslatePipe,} from "@ngx-translate/core";
import {Observable} from "rxjs";

let translations: any = {"CARDS_TITLE": "This is a test"};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return new Observable<any>(translations);
  }
}


describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        KparkComponentsModule,
        RouterTestingModule.withRoutes([
          {path: '', redirectTo: `${DashboardTab.PatientOverview}`, pathMatch: 'full'},
          {path: DashboardTab.PatientOverview, component: AppComponent},
          {path: DashboardTab.MedicalPatientHistory + '/:patient', component: AppComponent},
          {path: '**', redirectTo: ''},
        ]),
        ToastNoAnimationModule.forRoot({
          positionClass: 'toast-bottom-right'
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader},
        })
      ],
      declarations: [ErrorComponent, TranslatePipe],
      providers: [
        ErrorComponent,
        ErrorService,
        FeaturesService,
        DragAndDropService,
        HttpClient,
        HttpHandler,
        DashboardComponent,
        AlertService,
        ToastrService
      ]
    })
    .compileComponents();

    component = TestBed.inject(ErrorComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
