import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const flyoutMenuAnimation = trigger(
  'flyoutMenuAnimation', [
    transition('void => open-desktop', [
      style({left: '-320px'}),
      animate('300ms', keyframes([
        style({left: '0px'})
      ]))
    ]),
    transition('open-desktop => void', [
      style({left: '0px'}),
      animate('300ms', keyframes([
        style({left: '-320px'})
      ]))
    ]),
    transition('void => open-mobile', [
      style({bottom: '-472px'}),
      animate('300ms', keyframes([
        style({bottom: '48px'})
      ]))
    ]),
    transition('open-mobile => void', [
      style({bottom: '48px'}),
      animate('300ms', keyframes([
        style({bottom: '-472px'})
      ]))
    ])
  ]
);

export const backdropFade = trigger(
  'backdropFade', [
    transition(':enter', [
      style({opacity: 0}),
      animate('300ms', keyframes([
        style({opacity: 0.5})
      ]))
    ]),
    transition(':leave', [
      style({opacity: 0.5}),
      animate('300ms', keyframes([
        style({opacity: 0})
      ]))
    ])
  ]
);

export const flyoutUserMenuAnimation = trigger(
  'flyoutUserMenuAnimation', [
    transition('void => open-desktop', [
      style({top: '-288px'}),
      animate('300ms', keyframes([
        style({top: '48px'})
      ]))
    ]),
    transition('open-desktop => void', [
      style({top: '48px'}),
      animate('300ms', keyframes([
        style({top: '-288px'})
      ]))
    ]),
    transition('void => open-mobile', [
      style({bottom: '-288px'}),
      animate('300ms', keyframes([
        style({bottom: '48px'})
      ]))
    ]),
    transition('open-mobile => void', [
      style({bottom: '48px'}),
      animate('300ms', keyframes([
        style({bottom: '-288px'})
      ]))
    ])
  ]
);

export const flyoutSearchAnimation = trigger(
  'flyoutSearchAnimation', [
    transition('void => false', []),
    transition(':enter', [
      style({right: '-384px'}),
      animate('300ms', keyframes([
        style({right: '0px'})
      ]))
    ]),
    transition('false => void', []),
    transition(':leave', [
      style({right: '0px'}),
      animate('300ms', keyframes([
        style({right: '-384px'})
      ]))
    ])
  ]
)

export  const sheetAnimation = trigger(
  'sheetAnimation', [
    transition(':enter', [
      style({bottom: '-100vh'}),
      animate('300ms', keyframes([
        style({bottom: '0'})
      ]))
    ]),
    transition(':leave', [
      style({bottom: '0'}),
      animate('300ms', keyframes([
        style({bottom: '-100vh'})
      ]))
    ])
  ]
)
