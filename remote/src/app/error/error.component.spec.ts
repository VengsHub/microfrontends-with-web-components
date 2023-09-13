import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { ErrorService } from '../shared/services/error.service';
import { FeaturesService } from '../shared/services/features.service';
import { DragAndDropService } from '../shared/services/drag-and-drop.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '../shared/services/alert/alert-service';
import { ToastNoAnimationModule, ToastrService } from 'ngx-toastr';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const translations = {"CARDS_TITLE": "This is a test"};

class FakeLoader implements TranslateLoader {
  getTranslation(_lang: string) {
    return of(translations);
  }
}


describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ErrorComponent, HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ToastNoAnimationModule.forRoot({
          positionClass: 'toast-bottom-right'
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader},
        })
      ],
      providers: [
        ErrorService,
        FeaturesService,
        DragAndDropService,
        AlertService,
        ToastrService
      ]
    })
    .compileComponents();
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
