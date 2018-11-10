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
  private readonly denominations = [0.05, 0.25, 1];

  showDollars: boolean = false;


  totalAmountDollars() {
    return (this.totalAmount * this.denomination).toFixed(2);
  }

  totalAmountCredits() {
    return this.totalAmount.toFixed(2) == this.totalAmount ? 
      this.totalAmount : this.totalAmount.toFixed(2);
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
    let idx = this.denominations.indexOf(this.denomination);
    window.console.log(idx);
    let newDenomination = 0.25;
    if (idx !== -1) {
      idx = idx + 1;
      if (idx == this.denominations.length) {
        idx = 0;
      }
      newDenomination = this.denominations[idx];
    } 
    this.denominationChange.emit(newDenomination);
  }
}
