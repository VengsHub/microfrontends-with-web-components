import { Component, Input } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { Patient } from '../../shared/models/patient.model';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent {
  @Input() patient?: Patient;

  constructor(public readonly modalService: ModalService) { }
}
