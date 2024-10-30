import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { Observable } from "rxjs";

import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from '../services/baseService/user.service';


export class JwtInterceptor implements HttpInterceptor {
  localStorageService: any;

  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = this.localStorageService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.stringify(token)}`
        }
      });
    }
    return next.handle(req);
  }
}
export function authGuard (){

   const userService=inject(UserService)
   const  router =inject(Router)
   if (userService.isAuthenticated()){
      return true;
   }
      router.navigate(['/login']);
      return false;
}
