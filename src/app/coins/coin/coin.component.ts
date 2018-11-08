import { Component, OnInit, Input, Output } from "@angular/core";
import { Coin } from "../../shared/coin";
import { CoinService } from "../coin.service";

@Component({
  selector: "[app-coin]",
  templateUrl: "./coin.component.html",
  styleUrls: ["./coin.component.css"]
})
export class CoinComponent implements OnInit {
  @Input() coin: Coin;
  isHolded: boolean;

  constructor(private coinService: CoinService) {}

  ngOnInit() {}

  holdCoin() {
    this.coinService.holdedCoinsChanged.next(this.coin.rank);
    this.isHolded = !this.isHolded;
  }

  isPositiveIncrease24h() {
    return this.coin.change24h > 0;
  }

  isPositiveIncrease1h() {
    return this.coin.change1h > 0;
  }
}
