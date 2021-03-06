import { Injectable, OnInit } from "@angular/core";
import { Coin } from "./coin";
import { CoinApiService } from "../coins/coin-api.service";
import { Subject } from "rxjs";

@Injectable()
export class CoinService implements OnInit {
  holdedCoinsChanged = new Subject<Coin[]>();

  coinsChanged = new Subject<Coin[]>();

  // is GET Requested data change
  isChanged = ["ds", "dsa"];

  holdedCoins: Coin[] = [];
  coins: Coin[] = [];

  sortType: { sortype: string; inc: boolean } = { sortype: "rank", inc: false };

  ngOnInit() {}

  constructor(private coinApiService: CoinApiService) {}

  getHoldedCoins() {
    return this.holdedCoins.slice();
  }

  holdCoin(coin: Coin) {
    this.holdedCoins.push(coin);
    this.holdedCoinsChanged.next(this.holdedCoins);
  }

  unHoldCoin(coin: Coin) {
    let index;
    // Finding index of unholded coin
    this.holdedCoins.forEach(data => {
      if (data.rank === coin.rank) {
        index = this.holdedCoins.indexOf(data);
      }
    });
    this.holdedCoins.splice(index, 1);
    this.holdedCoinsChanged.next(this.holdedCoins);
  }

  getCoins() {
    return this.coins;
  }

  assignSortType(propName: { sortype: string; inc: boolean }) {
    this.sortType = propName;
    if (propName.inc) {
      this.sortDec(propName.sortype);
    } else {
      this.sortInc(propName.sortype);
    }
  }

  updateCoins() {
    this.coinApiService.getCoins().subscribe(data => {
      let changed = this.notifyChanges(data);

      if (changed) {
        this.coins = [];
        for (let coin of Object.keys(data.data)) {
          let newCoin = new Coin(
            data.data[coin].id,
            data.data[coin].name,
            data.data[coin].quotes.USD.price,
            data.data[coin].quotes.USD.percent_change_1h,
            data.data[coin].quotes.USD.percent_change_24h,
            "https://s2.coinmarketcap.com/static/img/coins/16x16/" +
              data.data[coin].id +
              ".png",
            data.data[coin].rank
          );
          this.coins.push(newCoin);
        }
        this.sortInc(this.sortType.sortype);
      }
    });
  }

  sortInc(propName) {
    this.coins.sort((a, b) =>
      a[propName] < b[propName] ? -1 : a[propName] > b[propName] ? 1 : 0
    );
    this.updateHoldedCoins();
    this.coinsChanged.next(this.coins);
  }

  sortDec(propName) {
    this.coins.sort((a, b) =>
      a[propName] < b[propName] ? 1 : a[propName] > b[propName] ? -1 : 0
    );
    this.updateHoldedCoins();
    this.coinsChanged.next(this.coins);
  }

  updateHoldedCoins() {
    let tempRanks = [];
    for (let i of this.holdedCoins) {
      tempRanks.push(i.id);
    }
    this.holdedCoins = [];

    this.coins.forEach(coin => {
      if (tempRanks.includes(coin.id)) {
        this.holdedCoins.push(coin);
      }
    });

    this.holdedCoinsChanged.next(this.holdedCoins);
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
