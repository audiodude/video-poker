import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BettingComponent} from './betting/betting.component';
import {CardComponent} from './card/card.component';
import {CardsComponent} from './cards/cards.component';
import {ControlsComponent} from './controls/controls.component';
import {PaytableComponent} from './paytable/paytable.component';

@NgModule({
  declarations: [
    AppComponent,
    PaytableComponent,
    CardsComponent,
    ControlsComponent,
    CardComponent,
    BettingComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
