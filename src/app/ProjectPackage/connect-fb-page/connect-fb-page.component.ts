 
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';

@Component({
  selector: 'app-connect-fb-page',
  templateUrl: './connect-fb-page.component.html',
  styleUrls: ['./connect-fb-page.component.scss'],
})
export class ConnectFbPageComponent implements OnInit { 
  @Input() project_id: any;
  isConnect = false;
  constructor(
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
  
  async onConnect(d){
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
}
