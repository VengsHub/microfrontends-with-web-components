import { Pipe, PipeTransform } from '@angular/core';
import { Widget } from '../models/widget.model';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {
  transform(widgets: Widget[], searchTerm: string): Widget[] {
    return widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }
}
