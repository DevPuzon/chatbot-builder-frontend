import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SplashScreenComponent, SplashScreenController } from 'src/app/InteractivePackage/splash-screen/splash-screen.component';
import { LoaderComponentService } from 'src/app/utils/loader-component.service';

@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.scss'],
})
export class AuthMainComponent implements OnInit {

  isLogin = true;
  constructor(private route:ActivatedRoute, 
    private splCtrl:SplashScreenController, 
    private router:Router) {  
    route.url.subscribe((url:any) =>{
      this.isLogin = !!router.url.includes('login'); 
      this.splCtrl.showDefTime(); 
    }); 
    
  }

  ngOnInit() {    
    // this.service.setRootViewContainerRef(this.viewContainerRef)
  }

}
