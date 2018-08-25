import { Component, OnInit } from '@angular/core';
import { Ad } from "src/app/model/Ad";
import { AdsService } from "src/app/ads.service";

@Component({
  selector: 'app-addads',
  templateUrl: './addads.component.html',
  styleUrls: ['./addads.component.css']
})
export class AddadsComponent implements OnInit {

  ad: Ad;
  success: string; // good | bad  -> for allert

  constructor(private adsService: AdsService) {}

  ngOnInit() {
    this.ad = new Ad();
    this.ad.date = new Date();
    this.ad.username = localStorage.getItem('username');
    this.ad.isBuying = 1;
  }

  save(): void {
    console.log(this.ad);
    this.adsService.saveAd(this.ad).subscribe(t => {
      this.success = t ? 'good' : 'bad';
      if (t)
        this.ngOnInit();
    });
  }


}
