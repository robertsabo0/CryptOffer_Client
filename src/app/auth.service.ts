import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { SERVER_URL } from "src/app/config";
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from "rxjs";


 const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*'
        })
      };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url :string = SERVER_URL;

  constructor(
    private http : HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public checkUserAndPass(user:string, pas:string):Observable<any>{
    let token = btoa(user+':'+pas);
    localStorage.setItem('token',token);

    console.log(user+"-"+pas);

    return this.http.get<any>(this.url,httpOptions)
    .pipe(
        tap(t => {
          console.log("login test passed");
          localStorage.setItem('token',token);
          localStorage.setItem('username',user);
      })
    )
    
  }
  public logout():Observable<any>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    
    return this.http.get<any>(this.url,httpOptions)
    .pipe(
        tap(() => {
          console.log("logout");
      })
    )
    
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return localStorage.getItem('token') ? true : false;
  }

}
