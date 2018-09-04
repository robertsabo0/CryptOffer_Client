import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { of, Observable } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { HttpErrorResponse } from "@angular/common/http";
import 'rxjs/add/operator/do';
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
        
  constructor(public auth: AuthService,
                private router : Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    var hasAuthReq:boolean = request.headers.get('Authorization') != null;
    if( !hasAuthReq && this.auth.isAuthenticated()){
      console.log('its logedin');
      request = request.clone({ setHeaders: {Authorization: `bearer ${this.auth.getToken()}`}});//.headers.append('Authorization', `bearer ${this.auth.getToken()}`);
      console.log('headers: '+request.headers);
    }

    console.log("intercepted");
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        
      }
    }, (err: any) => {
      console.log('got eer');
      if (err instanceof HttpErrorResponse) {
        console.log('jes it is');
        console.log('status '+err.status);
        if (err.status === 401 || err.status === 403) {
              localStorage.setItem('error', err.status+"")
              this.router.navigate(['/login/'+err.status]);
        }
        this.router.navigate(['/login']);
      }
    });
  }
}