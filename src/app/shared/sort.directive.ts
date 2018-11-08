import {
  Directive,
  HostListener,
  Input
} from "../../../node_modules/@angular/core";
import { CoinService } from "./coin.service";

@Directive({
  selector: "[app-sort]"
})
export class SortDirective {
  @Input() propName: string;
  propNameIncrease: boolean = true;
  constructor(private coinService: CoinService) {}

  @HostListener("click")
  sortAs() {
    this.propNameIncrease = !this.propNameIncrease;
    let propToSort = {
      sortype: this.propName,
      inc: this.propNameIncrease
    };
    this.coinService.assignSortType(propToSort);
  }
}
