import { Component, OnInit, Input } from "@angular/core";
import { Coin } from "../../shared/coin";
import { CoinService } from "../../shared/coin.service";

@Component({
  selector: "[app-holded-coin]",
  templateUrl: "./holded-coin.component.html",
  styleUrls: ["./holded-coin.component.css"]
})
export class HoldedCoinComponent implements OnInit {
  @Input() coin: Coin;
  constructor(private coinService: CoinService) {}

  ngOnInit() {}

  unHoldCoin() {
    this.coinService.unHoldCoin(this.coin);
  }

  isPositiveIncrease24h() {
    return this.coin.change24h > 0;
  }

  isPositiveIncrease1h() {
    return this.coin.change1h > 0;
  }
}
