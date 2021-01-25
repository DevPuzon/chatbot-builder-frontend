import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
import { PreviewTemplateComponent } from '../preview-template/preview-template.component';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.scss'],
})
export class ListTemplateComponent implements OnInit {
  isProgressLoading = false
  template_data = new Array();
  constructor(
    private loadingController:LoadingController,
    private router:Router,
    private modalController:ModalController,
    private toast:ToastMessageService,
    private cusHttp:CustomHttp
  ) { }

  ngOnInit() {
    this.onCType(null);
  }

  async onPreview(item){ 
    console.log(item);
    const modal = await this.modalController.create({
      component: PreviewTemplateComponent, 
      cssClass:'modal-rad',
      componentProps:{
        template_data:item
      }
    });
    return await modal.present();
  }

  async onBlankProj(){
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    
    this.cusHttp.post('project/create',{})
    .subscribe(async (snap:any)=>{
      await loading.dismiss(); 
      console.log(snap); 
      this.router.navigate(['t'],{queryParams:{project_id:snap.project_id}});
    },async(err)=>{ 
      await loading.dismiss(); 
      this.toast.presentToast(this.cusHttp.httpErrRes(err));
    }) ;
  }

  onCType(ev){ 
    let sort_type = '';
    if(ev == null){
      sort_type = 'all';
    }else{
      sort_type = ev.detail.value;
    }
    this.isProgressLoading = true; 
    this.cusHttp.get(`template/list?sort_type=${sort_type}`)
    .subscribe((snap:any)=>{
      this.isProgressLoading = false;
      this.template_data = snap.data;
      console.log(snap);
    },err=>{
      this.toast.presentToast(this.cusHttp.httpErrRes(err));
    })
  }  
}
