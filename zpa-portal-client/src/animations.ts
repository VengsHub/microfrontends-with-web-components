import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const expandIdentityBar = trigger(
  'expandIdentityBar', [
    transition(':enter', [
      style({opacity: 0, height: 0, 'margin-bottom': 0}),
      animate('400ms', keyframes([
        style({height: '*', 'margin-bottom': '16px', offset: 0.67}),
        style({opacity: 1, offset: 1})
      ]))
    ]),
    transition(':leave', [
      style({opacity: 0.5, height: '*', 'margin-bottom': '16px'}),
      animate('400ms', keyframes([
        style({opacity: 0, offset: 0.33}),
        style({height: 0, 'margin-bottom': 0, offset: 1})
      ]))
    ])
  ]
)
