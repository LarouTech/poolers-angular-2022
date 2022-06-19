import { Component, Inject, OnInit } from '@angular/core';

interface CardItemsType {
  title: string;
  icon: string;
  description?: string;
}

export const CARD_ITEMS: CardItemsType[] = [
  {
    title: 'league',
    icon: 'league',
    description:
      '...Join a poolers league and compete among the best fantasy GM on the planet hockey...',
  },
  {
    title: 'stats',
    icon: 'stats',
    description:
      '...Create a league, invites your favorite GMs and customize Poolers to create a unique experience...',
  },
  {
    title: 'real-time',
    icon: 'schedule',
    description:
      '...Interact with you peers in real-time and observe your player stats in real-time. Simply awesome...',
  },
];

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cards = CARD_ITEMS;
  ngOnInit(): void {}
}
