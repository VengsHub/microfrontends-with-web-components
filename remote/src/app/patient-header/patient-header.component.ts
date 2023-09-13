import {Component} from '@angular/core';
import {AsyncPipe, DatePipe, JsonPipe, NgIf, NgOptimizedImage} from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TabBarComponent} from "../tab-bar/tab-bar.component";
import {DataService} from "../shared/services/data.service";
import { AgePipe } from '../shared/pipes/age.pipe';


@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss'],
  standalone: true,
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
})
export class PatientHeaderComponent {
  constructor(public readonly dataService: DataService) {
  }

  action() {
    alert('action')
  }
}
