import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';

@Component({
  selector: 'app-main-automation',
  templateUrl: './main-automation.page.html',
  styleUrls: ['./main-automation.page.scss'],
})
export class MainAutomationPage implements OnInit {

  constructor(private route:ActivatedRoute,
    private toast:ToastMessageService,
    private router:Router, 
    private custHttp:CustomHttp) { }

  ngOnInit() {  
    let cur_url = "";
    this.route.url.subscribe((url:any) =>{  
      console.log(cur_url);
      console.log( window.location.href);
      if(cur_url == ""){
        cur_url = window.location.href;
      }
      if(cur_url != window.location.href){
        cur_url = window.location.href;
        this.custHttp.get('project/item-list?project_id='+this.route.snapshot.queryParams.project_id)
        .subscribe((snap)=>{
          console.log(snap);
          this.router.navigate([],{queryParams:snap});
        },err=>{
          console.log(err);
          this.toast.presentToast(this.custHttp.httpErrRes(err));
        })
      }
    }); 
  }

}
