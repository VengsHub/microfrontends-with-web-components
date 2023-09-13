import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragAndDropService } from './shared/services/drag-and-drop.service';
import { MessagingService } from './shared/services/messaging.service';
import { ModalService } from './shared/services/modal.service';
import { DataService } from './shared/services/data.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { IconPipe } from './shared/pipes/icon.pipe';
import { ErrorComponent } from './error/error.component';
import { AsyncPipe, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { WidgetOverviewComponent } from './widget-overview/widget-overview.component';
import { PatientInfoComponent } from './modal-components/patient-info/patient-info.component';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    IconPipe,
    AsyncPipe,
    ErrorComponent,
    DashboardComponent,
    WidgetOverviewComponent,
    PatientInfoComponent,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    PatientHeaderComponent,
    TabBarComponent,
    RouterOutlet,
  ]
})
export class AppComponent {

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.hovered = '';
    this.modalService.hideModal();
  }

  hovered = '';

  constructor(private readonly tabTitle: Title,
              public readonly dataService: DataService,
              private readonly activatedRoute: ActivatedRoute,
              public readonly dragAndDropService: DragAndDropService,
              private readonly messagingService: MessagingService,
              public readonly modalService: ModalService,
              public translate: TranslateService) {

    translate.addLangs(['de']);
    translate.setDefaultLang('de');
    translate.use('de');

    dataService.patient$.pipe(takeUntilDestroyed()).subscribe(patient => {
      if (patient) tabTitle.setTitle(`${patient.firstName} ${patient.lastName}`);
    });

    messagingService.receiveMessages();
  }
}
