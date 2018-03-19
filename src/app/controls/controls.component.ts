import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent {
  @Input() selections: boolean[];
  @Input() canHold: boolean;
  @Output() cardHeld: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  toggleSelection(index: number) {
    if (this.canHold) {
      this.cardHeld.emit(index)
    }
  }
}
