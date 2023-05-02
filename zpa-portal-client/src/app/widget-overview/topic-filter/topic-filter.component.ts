import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssociatedTopic } from '../../shared/models/associated-topic';

@Component({
  selector: 'app-topic-filter',
  templateUrl: './topic-filter.component.html',
  styleUrls: ['./topic-filter.component.scss']
})
export class TopicFilterComponent {
  @Input() items: AssociatedTopic[] = [];
  @Input() selectedItems: AssociatedTopic[] = [];
  @Output() updateSelection = new EventEmitter<AssociatedTopic[]>();

  toggleItem(item: AssociatedTopic) {
    if (this.selectedItems.includes(item)) {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    } else {
      this.selectedItems = [...this.selectedItems, item];
    }
    this.updateSelection.emit(this.selectedItems);
  }

  resetSelection() {
    this.selectedItems = [];
    this.updateSelection.emit(this.selectedItems);
  }

}
