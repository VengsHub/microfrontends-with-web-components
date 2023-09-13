import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WidgetsService } from './shared/services/widgets.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './shared/services/error.service';
import { DataService } from './shared/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FeaturesService } from './shared/services/features.service';
import { of } from 'rxjs';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { RouterTestingModule } from '@angular/router/testing';

const translateService = {
  addLangs: (_langs: string[]) => '',
  setDefaultLang: (_lang: string) => '',
  use: (_lang: string) => ''
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppComponent,
        HttpClientTestingModule,
        TabBarComponent,
        PatientHeaderComponent,
      ],
      providers: [
        ErrorService,
        {provide: DataService, useValue: {patient$: of({})}},
        {provide: FeaturesService, useValue: {}},
        {provide: WidgetsService, useValue: {updateDashboardWidgets: () => ''}},
        {provide: ToastrService, useValue: {}},
        {provide: TranslateService, useValue: translateService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
