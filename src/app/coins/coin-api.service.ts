import { Injectable } from "../../../node_modules/@angular/core";
import { Http, Response } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable()
export class CoinApiService {
  constructor(private http: Http) {}

  getCoins() {
    return this.http
      .get("https://api.coinmarketcap.com/v2/ticker/?limit=100")
      .pipe(
        map((response: Response) => {
          const data = response.json();
          return data;
        })
      );
  }
}
