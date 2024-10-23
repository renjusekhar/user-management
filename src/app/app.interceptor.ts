import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = 'https://microsoftedge.github.io'; 

    let modifiedReq = req.clone({ url: `${baseUrl}${req.url}` }); 

    //   modifiedReq = modifiedReq.clone({
    //     // setHeaders: {
    //     //   Authorization: `Bearer ${token}` // Add authorization token
    //     // }
    //   });
    // // }

    return next.handle(modifiedReq); // Pass the modified request to the next handler
  }
}
