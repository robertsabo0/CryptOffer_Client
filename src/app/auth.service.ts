import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { SERVER_URL, AUTH_SERVER_URL, CLIENT_ID, CLIENT_SECRET } from "src/app/config";
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public checkUserAndPass(user:string, pas:string):Observable<any>{
    var data = "username="+user+"&password="+pas+"&grant_type=password";
    var url = AUTH_SERVER_URL + "token";//+"?"+data;

    var tok = btoa(CLIENT_ID+':'+CLIENT_SECRET);
    var  httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',
          'Content-Type':'application/x-www-form-urlencoded',
          "Authorization":`Basic ${tok}`
        })
      };

    console.log('token: '+tok);
    console.log('get from url' +url);
    //return this.http.post(url,httpOptions);
    return this.http.post(url,data, httpOptions);
    /* from EJB
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
    )*/
  }
  public logout():Observable<any>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
     var  httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',
          'Content-Type':'application/x-www-form-urlencoded',
          "Authorization":`Basic aaa`
        }),
        withCredentials: true
      };
    return this.http.get<any>(AUTH_SERVER_URL,httpOptions)
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
