import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import { expandIdentityBar } from '../../animations';
import { FeaturesService } from '../shared/services/features.service';
import { Subject } from 'rxjs';
import { Patient } from '../shared/models/patient.model';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-identity-bar',
  animations: [expandIdentityBar],
  templateUrl: './identity-bar.component.html',
  styleUrls: ['./identity-bar.component.scss']
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
