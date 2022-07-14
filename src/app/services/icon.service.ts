import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const Icons: string[] = [
  'logo',
  'login',
  'email',
  'lock',
  'signin',
  'right-arrow',
  'exclamation',
  'close',
  'validate',
  'hamburger',
  'openHand',
  'stop',
  'caret',
  'settings',
  'logout',
  'standing',
  'stats',
  'lobby',
  'family',
  'person',
  'clown',
  'unknow-user',
  'schedule',
  'success',
  'game',
  'back',
  'league',
  'poolers',
  'arrow_up',
  'star',
  'triangle',
  'cake',
  'milestone',
  'faq',
  'code',
  'news',
  'arrow_down',
  'left_arrow',
  'matchup',
  'arrow-right-square',
  'team',
  'player',
  'press',
  'sorter_down',
  'filter',
  'search',
  'flag',
  'side',
  'baby',
  'reset',
  'skate',
  'goalie',
  'shield',
];

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private iconsGenerator: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  generateSvgMatIcon(name: string) {
    this.iconsGenerator.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../assets/icons/${name}.svg`
      )
    );
  }
}
