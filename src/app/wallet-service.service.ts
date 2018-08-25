import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Coin } from './model/Coin';
import { CoinDetailed } from "src/app/model/CoinDetailed";
import { SERVER_URL } from "src/app/config";
import { Buying } from "src/app/model/Buying";

const httpOptionsJson = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
        })
      };

 const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*'
        })
      };

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  coinsUrl :string = SERVER_URL+'coins';
  allcoinsUrl :string = this.coinsUrl+'/all';

  constructor(
    private http : HttpClient
  ) {}

  getCoins():Observable<Coin[]>{
   
    return this.http.get<Coin[]>(this.coinsUrl,httpOptions).pipe(
        tap(t => {console.log("coins fetched "); console.log(t);})
      );
  }

  getCoin(symbol:string):Observable<CoinDetailed>{
    const url = this.coinsUrl+"/"+symbol;
    console.log(url);
    return this.http.get<CoinDetailed>(url,httpOptions)
      .pipe(
        tap(t => {console.log("coins fetched "+symbol);console.log(t); })
      )
  }

  getAllCoins():Observable<Coin[]>{
    return this.http.get<Coin[]>(this.allcoinsUrl, httpOptions)
      .pipe(
        tap(t => {console.log("getAllCoins fetched ");console.log(t); })
      )
  }

  saveBuyin(buyin: Buying):Observable<Boolean>{
      return this.http.put<Boolean>(this.coinsUrl, buyin, httpOptionsJson).pipe(
        tap(t => {console.log("saveBuyin one ");console.log(t); })
      )
  }
  
}
