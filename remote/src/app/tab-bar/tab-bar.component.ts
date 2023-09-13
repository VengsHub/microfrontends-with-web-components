import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DashboardTab } from '../shared/models/dashboard-widget.model';
import {SecondTabService} from "../shared/services/second-tab.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
  ]
})
export class TabBarComponent {
  constructor(public readonly secondTabService: SecondTabService) {
  }
  protected readonly DashboardTab = DashboardTab;
}
