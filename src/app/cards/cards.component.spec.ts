import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CardComponent} from '../card/card.component';
import {ControlsComponent} from '../controls/controls.component';
import {PaytableComponent} from '../paytable/paytable.component';

import {CardsComponent} from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({declarations: [CardComponent, CardsComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
