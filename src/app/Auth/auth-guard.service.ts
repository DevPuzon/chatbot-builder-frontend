import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
 
import { Observable } from 'rxjs';
import { CustomHttp } from '../utils/custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{ 

  constructor(private custHttps:CustomHttp
    ,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem("-=[]t")){
      console.log("AuthGuardService");
      this.custHttps.getUser().then(()=>{
        this.router.navigateByUrl("p");
      }).catch(()=>{ this.router.navigateByUrl("");})
      return false;
    }else{
      return true;
    }
  }  
}
