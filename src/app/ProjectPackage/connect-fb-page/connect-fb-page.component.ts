 
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { FbProcessService } from 'src/app/utils/fb-process.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';

@Component({
  selector: 'app-connect-fb-page',
  templateUrl: './connect-fb-page.component.html',
  styleUrls: ['./connect-fb-page.component.scss'],
})
export class ConnectFbPageComponent implements OnInit { 
  @Input() project_id: any;
  isConnect = false;
  constructor(private authService: SocialAuthService,
    private custHttps:CustomHttp,
    private mdlCtrl:ModalController,
    private router:Router,
    private route : ActivatedRoute,
    private cusHttp:CustomHttp,
    private loadingController:LoadingController,
    private toast:ToastMessageService
  ) { }

  ngOnInit() { 
    console.log(this.project_id);
    this.initFbPages(); 
  }
    
  fbpages = new Array();
  isLoading = false;
  initFbPages() {  
    this.isLoading = true;
    this.cusHttp.get('fbpage/list')
    .subscribe((snap:any)=>{   
      this.isLoading = false; 
      console.log(snap);
      if(snap.length == 0){
        return;
      }
      this.fbpages = snap;
    },err=>{    
      this.isLoading = false;
      this.toast.presentToast(this.cusHttp.httpErrRes(err));
    })
  }

  onBack(){
    this.mdlCtrl.dismiss({isConnect:this.isConnect});
  }
  
  async onConnectFbPage(d){
    if(d.is_problem_connection){
      this.toast.presentToast(`Please make sure you are an ${d.name} admin.`)
      return;
    }
    const data = {
      fb_page_id:d.fb_page_id 
    }
    
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    this.custHttps.put('project/connect-fbpage?project_id='+this.project_id,data)
    .subscribe(async (snap:any)=>{
      console.log(snap);
      await loading.dismiss();
      this.isConnect = true;
      this.fbpages = snap.fbpages; 
      console.log( snap.fbpage_updated);
      this.router.navigate([], { relativeTo: this.route, queryParams: snap.fbpage_updated });
    },async (err)=>{
      await loading.dismiss();
      this.toast.presentToast(this.cusHttp.httpErrRes(err));
    })
  }
  async onConnectFbAcc(){
    
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    const fbLoginOptions = {
      // scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
      scope:'email,public_profile,pages_show_list,pages_messaging,pages_read_engagement,pages_manage_metadata',
      return_scopes: true,
      enable_profile_selector: true
     }; 
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID,fbLoginOptions ).then(async (snap)=>{
      console.log(snap);
      FbProcessService.stat_cusHttp = this.cusHttp; 
      const u_long_access_token = await FbProcessService.getLongLiveUserAToken(snap.authToken);
      const data = await FbProcessService.getLongLivePageToken(snap.id,u_long_access_token);
      const prep_data = await FbProcessService.prepPages(data);
      const fb_data = await this.onSaveFbLogin(snap,u_long_access_token); 
      await FbProcessService.setFbPageAccessToken(prep_data);
      await loading.dismiss();  
      console.log(prep_data);
      
      window.location.reload();
    })
    .catch(async (err)=>{
      await loading.dismiss(); 
      console.log(err);
    })
  }

  onSaveFbLogin(basicInfo,u_long_access_token) {
    return new Promise<any>((resolve,reject)=>{
      const data = {   
        provider:"email+facebook",
        social_user_id :basicInfo.id,
        user_img :basicInfo.photoUrl,
        fb_user_access_token:u_long_access_token,
        is_email_verified: true
      } 
      this.cusHttp.put('fbpage/connect-email-to-fb',data)
      .subscribe((snap:any)=>{ 
        console.log(snap);
        resolve(snap);
      } , async (err) => { 
        reject({});
        this.toast.presentToast(this.cusHttp.httpErrRes(err));
      });
    });
  }
}
