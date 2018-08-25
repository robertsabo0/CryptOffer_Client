import { Component, OnInit } from '@angular/core';
import { Coin } from "src/app/model/Coin";
import { WalletService } from "src/app/wallet-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mycoins:Coin[] = [];

  totalinput:number = 0;
  totalCurrentCapital:number = 0;
  profit:number = 0;
  profitPercentual:number =0;
  counter:number = 0;

  constructor(
    private wallet:WalletService
  ) { }

  ngOnInit() {
    this.wallet.getCoins().subscribe(t => this.coinsGot(t));
  }

  coinsGot(resp: Coin[]):void{
    this.mycoins = resp;
    this.totalinput = 0;
    this.totalCurrentCapital = 0;
    this.mycoins.forEach(c => {
      this.totalinput += c.input;
      this.totalCurrentCapital += c.currentCapital;
    });
    this.profit = this.totalCurrentCapital - this.totalinput;
    this.profitPercentual = 100*this.profit/this.totalinput;
  }

}
