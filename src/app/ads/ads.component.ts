import { Component, OnInit,Input } from '@angular/core';
import { AdsService } from "src/app/ads.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Ad, BUYING_IMG, SELL_IMG } from "src/app/model/Ad";

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
    
  sessionusername:string;
  symbol: string;

  message: string;

  ads:Ad[] = [];

  success: string; // good | bad  -> for allert

  constructor(
    private route: ActivatedRoute,
    private adsService: AdsService
  ) { }

  ngOnInit() {
    this.sessionusername = localStorage.getItem('username');
    this.readSearchAndGetAds();
  }

  readSearchAndGetAds(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.getAds();
  }
  getAllAds():void{
    this.symbol = '';
    this.getAds();
  }
  getAds(): void {
    this.adsService.getAds(this.symbol).subscribe(t => this.gotAds(t));
  }

  gotAds(ads: Ad[]): void {
    if(!ads || !ads.length){
      this.message = "No found ads for "+this.symbol;
    } else {
      this.message = `Found ${ads.length} ads`;
      if(this.symbol)
        this.message += ` for searched symbol ${this.symbol}`;
    }
    this.ads = ads;
  }

  adRealized(ad:Ad){
    ad = this.prepareAd(ad);
    console.log(ad);
    this.adsService.saveAdDone(ad).subscribe(t =>this.gotResponseRealization(t));
  }
  adToWallet(ad:Ad){
    ad = this.prepareAd(ad);
    console.log(ad);
    this.adsService.adToWallet(ad).subscribe(t =>this.gotResponseRealization(t));
  }
  gotResponseRealization(bool:Boolean){
      this.success = bool?'good':'bad';
      if(bool)
        this.getAds();
    }
  getImageForIsBuying(isBuy:number):string{
    return isBuy != 0 ? BUYING_IMG : SELL_IMG;
  }
  
  prepareAd(ad:Ad):Ad{
    delete ad['adDone'];
    delete ad['buying'];
    return ad;
  }
}
