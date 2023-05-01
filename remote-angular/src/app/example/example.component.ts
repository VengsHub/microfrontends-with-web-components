import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ExampleComponent implements OnInit {
  @Input() input = '';
  @Input() arrayInput: number[] = [];
  @Output() output = new EventEmitter<string>;

  ngOnInit(): void {
    console.log('remote angular example app started!!', this.input);
    this.output.emit('remote angular example app event fired!');
  }

}
