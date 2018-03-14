import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FieldComponent} from './field/field.component';
import { PaytableComponent } from './paytable/paytable.component';
import { CardsComponent } from './cards/cards.component';
import { ControlsComponent } from './controls/controls.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    PaytableComponent,
    CardsComponent,
    ControlsComponent,
    CardComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
