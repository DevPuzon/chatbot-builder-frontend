import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';

@Component({
  selector: 'app-preview-template',
  templateUrl: './preview-template.component.html',
  styleUrls: ['./preview-template.component.scss'],
})
export class PreviewTemplateComponent implements OnInit {

  template_data :any;
  constructor(
    private mdlCtrl:ModalController,
    private cusHttp:CustomHttp,
    private toast:ToastMessageService,
    private router:Router,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
    console.log(this.template_data);
  }
 
  onPreviewMe(){
    //https://m.me/107790447304615
    window.open(`https://m.me/${this.template_data.fb_page_id}`, '_blank')
  }

  async useTemplate(){
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    this.cusHttp.post(`template/use?project_id=${this.template_data.project_id}&template_name=${this.template_data.name}`,{})
    .subscribe(async (snap:any)=>{
      await loading.dismiss();  
      
      this.cusHttp.get('project/item-list?project_id='+snap.project_id)
      .subscribe((snap)=>{
        console.log(snap);
        this.onDismiss();
        this.router.navigate(['t','automate'],{queryParams:snap}); 
      },err=>{
        console.log(err);
        this.toast.presentToast(this.cusHttp.httpErrRes(err));
      })
    },async(err)=>{ 
      await loading.dismiss(); 
      this.toast.presentToast(this.cusHttp.httpErrRes(err));
    }) ;
  }

  onDismiss(){
    this.mdlCtrl.dismiss();
  }
}
