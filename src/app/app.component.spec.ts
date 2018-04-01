import {async, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {BettingComponent} from './betting/betting.component';
import {CardComponent} from './card/card.component';
import {CardsComponent} from './cards/cards.component';
import {ControlsComponent} from './controls/controls.component';
import {FieldComponent} from './field/field.component';
import {PaytableComponent} from './paytable/paytable.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          declarations: [
            AppComponent,
            BettingComponent,
            CardsComponent,
            CardComponent,
            ControlsComponent,
            FieldComponent,
            PaytableComponent,
          ],
        })
        .compileComponents();
  }));

  it('should create the app', async(() => {
       const fixture = TestBed.createComponent(AppComponent);
       const app = fixture.debugElement.componentInstance;
       expect(app).toBeTruthy();
     }));
});
