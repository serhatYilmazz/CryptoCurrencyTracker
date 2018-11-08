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
  propNameIncrease: boolean = true;
  constructor(private coinService: CoinService) {}

  ngOnInit() {
    this.coins = this.coinService.holdedCoins;
    this.holdedCoinsSubscription = this.coinService.holdedCoinsChanged.subscribe(
      data => {
        this.coins = data;
      }
    );
  }

  sortCoins(propName: string) {
    this.propNameIncrease = !this.propNameIncrease;
    let propToSort = {
      sortype: propName,
      inc: this.propNameIncrease
    };
    this.coinService.assignSortType(propToSort);
  }

  ngOnDestroy() {
    this.holdedCoinsSubscription.unsubscribe();
  }
}
