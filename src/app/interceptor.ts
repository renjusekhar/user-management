import { HttpEvent, HttpHandlerFn, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const baseUrl = 'https://microsoftedge.github.io'; 
  const request = req.clone({ url: `${baseUrl}${req.url}` });
  return next(request).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log(request.url, 'returned a response with status', event.status);
      }
    }),
    catchError(error => {
      console.error('Error occurred:', error.message);
      return throwError(() => new Error('An error occurred during the request.'));
    })
  );
}
