import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SplashScreenController } from 'src/app/InteractivePackage/splash-screen/splash-screen.component';
import { ListContentTemplateComponent } from 'src/app/TemplatePackage/ListTemplate/list-content/list-content-template.component';
import { ListTemplateComponent } from 'src/app/TemplatePackage/ListTemplate/list-template/list-template.component';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';

@Component({
  selector: 'app-choose-template',
  templateUrl: './choose-template.component.html',
  styleUrls: ['./choose-template.component.scss'],
})
export class ChooseTemplateComponent implements OnInit {
  
  isLoading=new Array();
  guestTemplateChoosed =null;
  constructor(
    private splCtrl:SplashScreenController,
    private toast:ToastMessageService,
    private cusHttp:CustomHttp,
    private route:ActivatedRoute,
    private router:Router
  ) {  
  }

  ngOnInit() {   
  }

  templateLoading(ev){
    this.isLoading = ev.isLoading; 
  }

  templateItemClick(ev){
    this.guestTemplateChoosed= ev.guestTemplateChoosed;
  } 

  cProceed(){  
    if(this.guestTemplateChoosed != null){
      this.splCtrl.show();
      const project_id = this.route.snapshot.queryParamMap.get("project_id");
      this.cusHttp.post(`guest/use-template?from_project_id=${this.guestTemplateChoosed.project_id}&project_id=${project_id}`,{})
      .subscribe(()=>{ 
        this.splCtrl.dismiss();
        this.router.navigate(['guest','t'],{queryParams:this.route.snapshot.queryParams});
      },err=>{
        this.toast.presentToast(this.cusHttp.httpErrRes(err));
      });
    }else{
      this.splCtrl.showDefTime();
      this.router.navigate(['guest','t'],{queryParams:this.route.snapshot.queryParams});
    }
  }

}
