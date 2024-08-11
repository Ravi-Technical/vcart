import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService implements HttpInterceptor {
 
  contentType:any;

  constructor() { }

  token = localStorage.getItem('sellerToken');

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let httpheader = req.clone({
      setHeaders : {
        Authorization:this.token || ""
      }
    }) 
    return next.handle(httpheader);
  }

}
