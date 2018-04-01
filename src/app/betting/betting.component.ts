import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.css']
})
export class BettingComponent {
  @Input() betAmount: number;
  @Input() totalAmount: number;
  @Output() bet: EventEmitter<number> = new EventEmitter<number>();
  @Output() deal: EventEmitter<boolean> = new EventEmitter<boolean>();

  betClicked(amount: number) {
    this.bet.emit(amount);
  }

  dealClicked() {
    this.deal.emit(true);
  }
}
