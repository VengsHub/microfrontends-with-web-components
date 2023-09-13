import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import { Subject } from 'rxjs';
import {AsyncPipe, DatePipe, NgFor, NgIf} from "@angular/common";
import { expandIdentityBar } from '../../../animations';
import { IconPipe } from '../../shared/pipes/icon.pipe';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { Patient } from '../../shared/models/patient.model';
import { FeaturesService } from '../../shared/services/features.service';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-identity-bar',
  animations: [expandIdentityBar],
  templateUrl: './identity-bar.component.html',
  styleUrls: ['./identity-bar.component.scss'],
  standalone: true,
  imports: [
    IconPipe,
    AgePipe,
    DatePipe,
    AsyncPipe,
    NgIf,
    NgFor,
  ],
})
export class IdentityBarComponent implements OnDestroy {
  @Input() patient?: Patient;
  @Input() disableConfigureButton = false;
  @Output() startConfigureMode = new EventEmitter();
  showNotes = false;

  hovered = '';

  private readonly unsubscribe = new Subject();

  constructor(public readonly featureService: FeaturesService,
              public readonly dataService: DataService) {
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }
}
