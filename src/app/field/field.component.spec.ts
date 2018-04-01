import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BettingComponent} from '../betting/betting.component';
import {CardComponent} from '../card/card.component';
import {CardsComponent} from '../cards/cards.component';
import {ControlsComponent} from '../controls/controls.component';
import {PaytableComponent} from '../paytable/paytable.component';

import {FieldComponent} from './field.component';

describe('FieldComponent', () => {
  let component: FieldComponent;
  let fixture: ComponentFixture<FieldComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          declarations: [
            BettingComponent,
            CardComponent,
            CardsComponent,
            ControlsComponent,
            FieldComponent,
            PaytableComponent,
          ]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
