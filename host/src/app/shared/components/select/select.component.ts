import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { NgFor, NgIf } from "@angular/common";
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    ClickOutsideDirective,
    IconComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @ViewChild('selectField') selectFieldRef?: ElementRef;
  @Input () options : { label: string, value: string }[] = [];
  @Input () label = '';
  value = '';
  disabled= false;
  dropdownVisible = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_: string) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  getSelectedLabel(): string {
    const selectedItem = this.options.find(option => option.value === this.value);
    return selectedItem ? selectedItem.label : '';
  }

  selectOption(event: Event, option: { label: string, value: string }): void {
    // we need prevent the outSideClick directive from closing the dropdown
    event.stopPropagation();
    this.value = option.value;
    this.onChange(option.value);
    this.dropdownVisible = false;
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  writeValue(value: string) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
