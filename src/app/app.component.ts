import { Component, OnInit } from "@angular/core";
import { CoinService } from "./shared/coin.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "BlockChainNotification";

  constructor(private coinService: CoinService) {}
  counter = 0;
  ngOnInit() {
    this.coinService.updateCoins();
    setInterval(() => {
      this.coinService.updateCoins();
      console.log(this.counter++);
    }, 15000);
  }
}
