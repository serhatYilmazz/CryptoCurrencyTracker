import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CoinsComponent } from "./coins/coins.component";
import { CoinComponent } from "./coins/coin/coin.component";
import { CoinApiService } from "./coins/coin-api.service";
import { Http, HttpModule } from "../../node_modules/@angular/http";
import { CoinService } from "./coins/coin.service";

@NgModule({
  declarations: [AppComponent, CoinsComponent, CoinComponent],
  imports: [BrowserModule, HttpModule],
  providers: [CoinApiService, CoinService],
  bootstrap: [AppComponent]
})
export class AppModule {}
