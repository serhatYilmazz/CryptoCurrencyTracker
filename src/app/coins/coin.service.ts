import { Injectable, OnInit } from "../../../node_modules/@angular/core";
import { Coin } from "../shared/coin";
import { CoinApiService } from "./coin-api.service";
import { Subject } from "../../../node_modules/rxjs";

@Injectable()
export class CoinService implements OnInit {
  holdedCoinsChanged = new Subject<String>();

  coinsChanged = new Subject<Coin[]>();

  isChanged = ["ds", "dsa"];

  private holdedCoins = [];
  coins: Coin[] = [];

  ngOnInit() {}

  constructor(private coinApiService: CoinApiService) {}

  getHoldedCoins() {
    return this.holdedCoins.slice();
  }

  getCoins() {
    return this.coins;
  }

  updateCoins() {
    this.coinApiService.getCoins().subscribe(data => {
      let changed = this.notifyChanges(data);
      console.log(data.data[1027].quotes.USD.percent_change_24h < 0);

      if (changed) {
        this.coins = [];
        for (let coin of Object.keys(data.data)) {
          this.coins.push(
            new Coin(
              data.data[coin].id,
              data.data[coin].name,
              data.data[coin].quotes.USD.price,
              data.data[coin].quotes.USD.percent_change_1h,
              data.data[coin].quotes.USD.percent_change_24h,
              "https://s2.coinmarketcap.com/static/img/coins/16x16/" +
                data.data[coin].id +
                ".png",
              data.data[coin].rank
            )
          );
        }
        this.coins.sort((a, b) =>
          a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0
        );
        this.coinsChanged.next(this.coins);
      }
    });
  }

  private notifyChanges(data) {
    let changed = false;
    if (
      data.data[1].quotes.USD.percent_change_1h !== this.isChanged[0] &&
      this.isChanged[1] !== data.data[1027].quotes.USD.percent_change_1h
    ) {
      this.notify();
      changed = true;
    }
    this.isChanged.splice(
      0,
      2,
      data.data[1].quotes.USD.percent_change_1h,
      data.data[1027].quotes.USD.percent_change_1h
    );
    return changed;
  }

  private notify() {
    let notification = new Audio();
    notification.src = "../../assets/audio/notification.wav";
    notification.load();
    notification.play();
  }
}
