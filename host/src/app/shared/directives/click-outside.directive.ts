import { Directive, ElementRef, Inject, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  @Output() appClickOutside = new EventEmitter<MouseEvent>();
  private subscription?: Subscription;
  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    setTimeout(() => {
      this.subscription = fromEvent<MouseEvent>(this.document, 'click')
        .pipe(
          filter(event => {
            const clickTarget = event.target as HTMLElement;
            return !this.isOrContainsClickTarget(this.element.nativeElement, clickTarget);
          }),
        )
        .subscribe(() => this.appClickOutside.emit());
    }, 0);
  }

  private isOrContainsClickTarget(element: HTMLElement, clickTarget: HTMLElement) {
    return element == clickTarget || element.contains(clickTarget);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
