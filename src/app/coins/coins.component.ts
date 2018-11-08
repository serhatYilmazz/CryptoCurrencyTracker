import { Component, OnInit, OnDestroy } from "@angular/core";
import { Coin } from "../shared/coin";
import { CoinApiService } from "./coin-api.service";
import { Subscription } from "../../../node_modules/rxjs";
import { CoinService } from "./coin.service";

@Component({
  selector: "app-coins",
  templateUrl: "./coins.component.html",
  styleUrls: ["./coins.component.css"]
})
export class CoinsComponent implements OnInit, OnDestroy {
  coins: Coin[] = [];

  holdedCoins: String[] = [];

  coinsSubscription: Subscription;

  counter = 0;
  constructor(private coinService: CoinService) {}

  ngOnInit() {
    this.coinService.holdedCoinsChanged.subscribe(coinRank => {
      const index = this.holdedCoins.indexOf(coinRank, 0);
      if (index > -1) {
        this.holdedCoins.splice(index, 1);
      } else {
        this.holdedCoins.push(coinRank);
      }
    });

    this.coinService.updateCoins();
    this.coinsSubscription = this.coinService.coinsChanged.subscribe(
      coins => (this.coins = coins)
    );

    setInterval(() => {
      this.coinService.updateCoins();
      console.log(this.counter++);
    }, 15000);
  }

  ngOnDestroy() {
    this.coinsSubscription.unsubscribe();
  }
}
