import {Component, Input} from '@angular/core';
import {Card} from '../logic/deck';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() value: Card;
  @Input() held: boolean;
  @Input() idx: number;

  constructor() {}

  getClass(): string[] {
    const classes = [];
    if (this.idx === 4) {
      classes.push('last');
    }
    if (this.value) {
      classes.push(this.value.hidden ? 'hidden ' : '');
      classes.push(`s-${this.value.suit}`);
      classes.push(`r-${this.value.rank}`);
    }
    classes.push('card');
    classes.push(this.held ? 'held ' : '');
    return classes;
  }
}
