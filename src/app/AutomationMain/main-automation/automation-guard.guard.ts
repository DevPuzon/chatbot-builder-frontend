import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomHttp } from 'src/app/utils/custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class AutomationGuardGuard implements CanActivate {
  constructor(private cusHttp:CustomHttp){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.cusHttp.getUser() ;
    if(localStorage.getItem("-==0us")){
      return true;
    }else{
      return false;
    } 
  }
  
}
