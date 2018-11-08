import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoinsComponent } from "./coins/coins.component";
import { HoldedCoinsComponent } from "./holded-coins/holded-coins.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/currencies", pathMatch: "full" },
  { path: "currencies", component: CoinsComponent },
  { path: "holded-currencies", component: HoldedCoinsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
