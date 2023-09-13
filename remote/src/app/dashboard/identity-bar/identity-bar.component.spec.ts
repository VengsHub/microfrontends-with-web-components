import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityBarComponent } from './identity-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IconPipe } from '../../shared/pipes/icon.pipe';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { DataService } from '../../shared/services/data.service';
import { FeaturesService } from '../../shared/services/features.service';

describe('IdentityBarComponent', () => {
  let component: IdentityBarComponent;
  let fixture: ComponentFixture<IdentityBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IdentityBarComponent,
        IconPipe,
        AgePipe,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: DataService, useValue: {} },
        { provide: FeaturesService, useValue: { cAvailableFeatures: () => []} },
        { provide: ToastrService, useValue: {} } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
