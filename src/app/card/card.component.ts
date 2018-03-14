import {Component, Input} from '@angular/core';
import {Card} from './card';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() value: Card;
  @Input() held: boolean;

  constructor() {}

  getClass(): string {
    return `card ${this.value.hidden ? 'hidden ' : ' '}${
        this.held ? 'held ' : ' '}s-${this.value.suit} r-${this.value.rank}`;
  }
}
