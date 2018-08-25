import { Component, OnInit } from '@angular/core';
import { Buying } from "src/app/model/Buying";
import { WalletService } from "src/app/wallet-service.service";

@Component({
  selector: 'app-addbuying',
  templateUrl: './addbuying.component.html',
  styleUrls: ['./addbuying.component.css']
})
export class AddbuyingComponent implements OnInit {

  buyin: Buying;
  success: string; // good | bad  -> for allert

  constructor(
    private wallet: WalletService
  ) {
   this.buyin = new Buying();
    this.buyin.date = new Date();
  }

  ngOnInit() {
  }

  save(): void {
    console.log(this.buyin);
    this.wallet.saveBuyin(this.buyin).subscribe(t =>{
      this.success = t?'good':'bad';
      if(t)
        this.ngOnInit();
    });
  }
}
