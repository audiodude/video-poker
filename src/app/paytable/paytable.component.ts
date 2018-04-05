import {Component, Input} from '@angular/core';

import {Hand} from '../deck';

@Component({
  selector: 'paytable',
  templateUrl: './paytable.component.html',
  styleUrls: ['./paytable.component.css']
})
export class PaytableComponent {
  @Input() hand: Hand = Hand.NOTHING;
  @Input() payouts: any;
  @Input() betAmount: any;

  // Alias the enum for use in the template.
  Hand = Hand;

  constructor() {}

  isRoyalFlush(): boolean {
    return this.hand === Hand.ROYAL_FLUSH;
  }

  isStraightFlush(): boolean {
    return this.hand === Hand.STRAIGHT_FLUSH;
  }

  isFourOfAKind(): boolean {
    return this.hand === Hand.FOUR_OF_A_KIND;
  }

  isFullHouse(): boolean {
    return this.hand === Hand.FULL_HOUSE;
  }

  isFlush(): boolean {
    return this.hand === Hand.FLUSH;
  }

  isStraight(): boolean {
    return this.hand === Hand.STRAIGHT;
  }

  isThreeOfAKind(): boolean {
    return this.hand === Hand.THREE_OF_A_KIND;
  }

  isTwoPair(): boolean {
    return this.hand === Hand.TWO_PAIR;
  }

  isJacksOrBetter(): boolean {
    return this.hand === Hand.JACKS_OR_BETTER;
  }
}
