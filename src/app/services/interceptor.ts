import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class InterceptService implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		if (req.url.includes('access_token=')) {
			const paramReq = req.clone({
			});
			return next.handle(paramReq);
		} else {
			return next.handle(req);
		}
	}
}

