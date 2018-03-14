import {Component, Input} from '@angular/core';
import {Card, Deck, Rank, Suit} from '../deck';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() selections: boolean[];
  @Input() cards: Card[];

  constructor() {}
}
