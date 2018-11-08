import { Component, OnInit, OnDestroy } from "@angular/core";
import { Coin } from "../shared/coin";
import { CoinService } from "../shared/coin.service";
import { Subscription } from "../../../node_modules/rxjs";

@Component({
  selector: "app-holded-coins",
  templateUrl: "./holded-coins.component.html",
  styleUrls: ["./holded-coins.component.css"]
})
export class HoldedCoinsComponent implements OnInit, OnDestroy {
  coins: Coin[] = [];
  holdedCoinsSubscription: Subscription;

  constructor(private coinService: CoinService) {}

  ngOnInit() {
    console.log("Holdedds");
    this.coins = this.coinService.holdedCoins;
    this.holdedCoinsSubscription = this.coinService.holdedCoinsChanged.subscribe(
      data => {
        console.log("Holded");

        this.coins = data;
      }
    );
  }

  ngOnDestroy() {
    this.holdedCoinsSubscription.unsubscribe();
  }
}
