import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
 
import { Observable } from 'rxjs';
import { CustomHttpService } from '../utils/custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{ 

  constructor(private custHttps:CustomHttpService
    ,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem("-=[]t")){
      this.custHttps.getUser()
      .then((user)=>{
        this.router.navigateByUrl("t");
      })
      .catch(()=>{
        this.router.navigateByUrl(""); 
      }) 
    }else{
      return false;
    }
  }  
}
