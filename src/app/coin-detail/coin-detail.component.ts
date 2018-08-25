import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { WalletService } from "src/app/wallet-service.service";
import { CoinDetailed } from "src/app/model/CoinDetailed";
import { Coin } from "src/app/model/Coin";

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent implements OnInit {

  symbol:string='';
  coinDet : CoinDetailed;

  constructor(
    private route:ActivatedRoute,
    private wallet:WalletService
    ) {}

  ngOnInit() {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.wallet.getCoin(this.symbol).subscribe(t=>this.getCoinDetails(t));
    //this.wallet.getCoins().subscribe(t=>{
    //  this.coin = t.filter(t => t.symbol === this.symbol)[0]; 
    //})
  }

  getCoinDetails(coin:CoinDetailed):void{
    console.log(coin);
    this.coinDet = coin;  
  }
}
