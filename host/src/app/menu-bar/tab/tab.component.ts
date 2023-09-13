import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Tab } from '../../shared/models/tab.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { delay, of, switchMap } from 'rxjs';
import { IconComponent } from "../../shared/components/icon.component";
import { UserInterfaceService } from '../../shared/services/user-interface.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  standalone: true,
  imports: [NgIf, AsyncPipe, IconComponent]
})
export class TabComponent {
  @Input({required: true}) tab!: Tab;
  @Input() tabWidth = 280;
  @Input() isActive = false;
  @Input() shouldShrink = false;
  @Output() removeTab = new EventEmitter<void>;

  readonly sIsHovered = signal(false);
  // tooltip should show after 1s of hovering (so after 1s of this.sIsHovered being true)
  readonly showTooltip$ = toObservable(this.sIsHovered).pipe(
    switchMap(isHovered => isHovered ? of(true).pipe(delay(1000)) : of(false))
  );

  constructor(public readonly userInterfaceService: UserInterfaceService) {
  }
}
