import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SERVER_URL } from "src/app/config";
import { Ad } from "src/app/model/Ad";

const httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };
const httpOptionsJson = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json'
  })
};
      

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  adsUrl :string = SERVER_URL+'ads';
  adToWalletUrl :string = SERVER_URL+'\adsToWallet';

  constructor(
    private http : HttpClient
  ) {}

  getAds(symbol:string):Observable<Ad[]>{
    var url = this.adsUrl;
    if(symbol){
      url+="/"+symbol;
    }
    return this.http.get<Ad[]>(url,httpOptions)
      .pipe(
        tap(t => {console.log("ads fetched "+symbol);console.log(t); })
      )
  }
  saveAd(ad:Ad):Observable<Boolean>{
      return this.http.put<Boolean>(this.adsUrl, ad, httpOptionsJson).pipe(
        tap(t => {console.log("saveAd one ");console.log(t); })
      )
  }

  saveAdDone(ad:Ad):Observable<Boolean>{
     return this.http.post<Boolean>(this.adsUrl, ad, httpOptionsJson).pipe(
        tap(t => {console.log("saveAdDone one ");console.log(t); })
      )
  }

  adToWallet(ad:Ad):Observable<Boolean>{
    console.log(this.adToWalletUrl);
     return this.http.post<Boolean>(this.adToWalletUrl, ad, httpOptionsJson).pipe(
        tap(t => {console.log("adToWallet one ");console.log(t); })
      )
  }
  
}
