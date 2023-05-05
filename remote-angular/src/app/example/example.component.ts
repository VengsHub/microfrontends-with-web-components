import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { SubExampleComponent } from './sub-example/sub-example.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
  imports: [
    SubExampleComponent,
    NgFor
  ]
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
