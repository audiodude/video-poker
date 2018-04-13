import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Card, Deck, Rank, Suit} from '../logic/deck';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() selections: boolean[] = [];
  @Input() highlights: boolean[] = [];
  @Input() gameOver: boolean = false;
  @Input() cards: Card[] = [];
  @Input() canHold: boolean;
  @Output() cardHeld: EventEmitter<number> = new EventEmitter<number>();

  toggleSelection(index: number) {
    if (this.canHold) {
      this.cardHeld.emit(index)
    }
  }
}
