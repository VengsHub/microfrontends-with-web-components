import { Component, HostBinding, Input } from '@angular/core';

/*
  this component lays a svg as a mask-image over a html element,
  resulting in a color & size customizable version of the svg shape.
*/

export const iconNames = {
  'abrechnung': 'abrechnung',
  'address': 'address',
  'angle-down': 'angle-down',
  'angle-left': 'angle-left',
  'angle-right': 'angle-right',
  'angle-up': 'angle-up',
  'asterisk-required-star': 'asterisk-required-star',
  'bell-muted': 'bell-muted',
  'bell': 'bell',
  'building': 'building',
  'calendar-circle-user': 'calendar-circle-user',
  'calendar-cross': 'calendar-cross',
  'care': 'care',
  'certificate-of-incapacity': 'certificate-of-incapacity',
  'chart': 'chart',
  'check-double': 'check-double',
  'check': 'check',
  'clip': 'clip',
  'close': 'close',
  'contact': 'contact',
  'create-appointment': 'create-appointment',
  'door-open': 'door-open',
  'edit-pen': 'edit-pen',
  'ellipsis': 'ellipsis',
  'emergency': 'emergency',
  'error': 'error',
  'eye-slash': 'eye-slash',
  'facility': 'facility',
  'family': 'family',
  'files': 'files',
  'fingerprint': 'fingerprint',
  'home': 'home',
  'info': 'info',
  'insurance': 'insurance',
  'lab-transfer': 'lab-transfer',
  'menu-bars': 'menu-bars',
  'name-tag': 'name-tag',
  'open-in-new-tab': 'open-in-new-tab',
  'people-arrows': 'people-arrows',
  'plus': 'plus',
  'prescription': 'prescription',
  'search': 'search',
  'settings': 'settings',
  'sleep': 'sleep',
  'sort-up-down': 'sort-up-down',
  'square': 'square',
  'stammdaten': 'stammdaten',
  'support': 'support',
  'taxi': 'taxi',
  'training': 'training',
  'transfer': 'transfer',
  'user-cog': 'user-cog',
  'user-doctor': 'user-doctor',
  'user-nurse': 'user-nurse',
  'user': 'user',
  'users': 'users',
  'warning-circle': 'warning-circle',
  'warning-triangle': 'warning-triangle',
  'temp': 'temp',
}

const iconSizes = {
  xs: '12px',
  sm: '14px',
  standard: '16px',
  lg: '20px',
  xl: '24px'
}

const iconColors = {
  black: '#000000',
  white: '#FFFFFF',
  gray200: '#EFF0F0',
  blue500: '#166CC9',
  blue800: '#002B59',
  red500: '#E03131',
  red600: '#C31414'
}

@Component({
  selector: 'app-icon',
  template: '',
  styles: [
    `:host {
      display: inline-block;
      height: 16px;
      width: 16px;
      flex-shrink: 0;
      mask-size: cover;
      mask-repeat: no-repeat;
    }`
  ],
  standalone: true
})
export class IconComponent {

  // need to use -webkit prefix, since chrome is being a baby and not accepting mask-image without it
  @HostBinding('style.-webkit-mask-image') private filePath = '';

  private _name = '';
  @Input({ required: true })
  public set name(name: keyof typeof iconNames) {
    this._name = name;
    this.filePath = `url("assets/icons/${name}.svg")`;
  }

  @Input() @HostBinding('style.width') width = iconSizes.standard;
  @Input() @HostBinding('style.height') height = iconSizes.standard;

  @Input()
  public set size(size: keyof typeof iconSizes) {
    this.width = iconSizes[size];
    this.height = iconSizes[size];
  }

  @HostBinding('style.background-color') _color = iconColors.black;

  @Input()
  public set color(color: keyof typeof iconColors) {
    this._color = iconColors[color];
  }

  @Input() @HostBinding('style.-webkit-mask-size') maskSize: 'cover' | 'contain' = 'cover';
}
