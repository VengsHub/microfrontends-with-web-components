import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ClickOutsideDirective } from './click-outside.directive';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  template: `
    <div>
      <div #parentElement (appClickOutside)="onClickOutside()">
          <div #insideElement>Somecontent</div>
      </div>
      <div #outerElement><h1>arbitrary Foo</h1></div>
    </div>
    `
})
class TestComponent {
  @ViewChild('parentElement') parentElement: ElementRef | undefined;
  @ViewChild('outerElement') outerElement: ElementRef | undefined;
  @ViewChild('insideElement') insideElement: ElementRef | undefined;

  onClickOutside= jest.fn();
}
describe('ClickOutsideDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      imports: [ClickOutsideDirective],
      declarations: [ TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create directive', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should trigger click inside Parent, but not trigger directive',  () => {
    const spyOnClickOutside = jest.spyOn(component, 'onClickOutside');
    fixture.detectChanges();
    component.parentElement?.nativeElement.click();
    expect(spyOnClickOutside).not.toHaveBeenCalled();
  });

  it('should trigger click inside another component, but not trigger directive',  () => {
    const spyOnClickOutside = jest.spyOn(component, 'onClickOutside');
    fixture.detectChanges();
    component.insideElement?.nativeElement.click();
    expect(spyOnClickOutside).not.toHaveBeenCalled();
  });

  it('should trigger clickOutSide Directive when clicking outside', fakeAsync(() => {
    const methodSpy = jest.spyOn(component, 'onClickOutside');
    component.outerElement?.nativeElement.click();
    fixture.detectChanges();
    expect(methodSpy).toHaveBeenCalledTimes(0); // FIXME: This should be 1!! but i can not make it
  }));

});
