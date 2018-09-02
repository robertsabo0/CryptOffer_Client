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
    /*
    request = request.clone({
      setHeaders: {
        Authorization: `Basic ${this.auth.getToken()}`
      }
    });*/
    console.log("intercepted");
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        
      }
    }, (err: any) => {
      /*if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
              localStorage.setItem('error', err.status+"")
              this.router.navigate(['/login/'+err.status]);
        }
      }*/
    });
  }
}