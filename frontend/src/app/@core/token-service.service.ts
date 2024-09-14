import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


// Seller Request Intercept

@Injectable()

export class TokenServiceService implements HttpInterceptor {

  contentType: any;

  constructor() { }

  token = localStorage.getItem('sellerToken');

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.token) {
      return next.handle(req);
    }

    let httpheader = req.clone({
      setHeaders: {
        Authorization: this.token || "",
      }
    });
    
    return next.handle(httpheader);

  }

}



// User Request Intercept

@Injectable()

export class TokenUserService implements HttpInterceptor {

  contentType: any;

  constructor() { }

  userToken = localStorage.getItem('userToken');

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.userToken) {
      return next.handle(req);
    }

    let httpheader = req.clone({
      setHeaders: {
        Authorization: this.userToken || "",
      }
    });

    return next.handle(httpheader);

  }

}
