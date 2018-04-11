import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.css']
})
export class BettingComponent {
  @Input() betAmount: number;
  @Input() totalAmount: number;
  @Input() canBet: boolean;
  @Input() denomination: number;
  @Output() bet: EventEmitter<number> = new EventEmitter<number>();
  @Output() deal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  denominationChange: EventEmitter<number> = new EventEmitter<number>();

  showDollars: boolean = false;

  totalAmountDollars() {
    return (this.totalAmount * this.denomination).toFixed(2);
  }

  totalAmountClicked() {
    this.showDollars = !this.showDollars;
  }

  betClicked(amount: number) {
    this.bet.emit(amount);
  }

  dealClicked() {
    this.deal.emit(true);
  }

  denominationClicked() {
    const newDenomination = this.denomination === 0.25 ? 0.05 : 0.25;
    this.denominationChange.emit(newDenomination);
  }
}
