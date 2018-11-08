import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CoinsComponent } from "./coins/coins.component";
import { CoinComponent } from "./coins/coin/coin.component";
import { CoinApiService } from "./coins/coin-api.service";
import { Http, HttpModule } from "@angular/http";
import { CoinService } from "./shared/coin.service";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { HoldedCoinsComponent } from "./holded-coins/holded-coins.component";
import { HoldedCoinComponent } from "./holded-coins/holded-coin/holded-coin.component";
import { SortDirective } from "./shared/sort.directive";

@NgModule({
  declarations: [
    AppComponent,
    CoinsComponent,
    CoinComponent,
    HeaderComponent,
    HoldedCoinsComponent,
    HoldedCoinComponent,
    SortDirective
  ],
  imports: [BrowserModule, HttpModule, AppRoutingModule],
  providers: [CoinApiService, CoinService],
  bootstrap: [AppComponent]
})
export class AppModule {}
