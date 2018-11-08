import { Component, OnInit, OnDestroy } from "@angular/core";
import { Coin } from "../shared/coin";
import { CoinApiService } from "./coin-api.service";
import { Subscription } from "rxjs";
import { CoinService } from "../shared/coin.service";
import { log } from "util";

@Component({
  selector: "app-coins",
  templateUrl: "./coins.component.html",
  styleUrls: ["./coins.component.css"]
})
export class CoinsComponent implements OnInit, OnDestroy {
  coins: Coin[] = [];

  coinsSubscription: Subscription;
  holdedCoinsSubscription: Subscription;
  holdedCoins: Coin[] = [];

  counter = 0;

  constructor(private coinService: CoinService) {}

  ngOnInit() {
    this.holdedCoins = this.coinService.holdedCoins;
    this.holdedCoinsSubscription = this.coinService.holdedCoinsChanged.subscribe(
      data => {
        this.holdedCoins = data;
      }
    );

    this.coins = this.coinService.getCoins();
    this.coinsSubscription = this.coinService.coinsChanged.subscribe(coins => {
      this.coins = coins;
    });
  }

  ngOnDestroy() {
    this.coinsSubscription.unsubscribe();
    this.holdedCoinsSubscription.unsubscribe();
  }
}
