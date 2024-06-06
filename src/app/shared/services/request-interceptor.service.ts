import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptorService {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // req = req.clone({
    //   setHeaders: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // req = req.clone({
    //   setHeaders: {
    //     enctype: 'multipart/form-data',
    //   },
    // });
    return next.handle(req);
  }
}
