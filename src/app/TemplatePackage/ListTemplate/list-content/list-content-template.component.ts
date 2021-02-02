import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'; 
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';  
import { SplashScreenController } from 'src/app/InteractivePackage/splash-screen/splash-screen.component';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
import { PreviewTemplateComponent } from '../../preview-template/preview-template.component';
@Component({
  selector: 'app-list-template-content',
  templateUrl: './list-content-template.component.html',
  styleUrls: ['./list-content-template.component.scss'],
})
export class ListContentTemplateComponent implements OnInit {
  @Input() isProjectViewed = false;
  @Input() isGuestChooseTemplate = false;
  guestTemplateChoosed =null;
  guestHighLightTemplates = new Array();

  template_data = new Array();
  @Output() out_loading = new EventEmitter<any>();
  @Output() out_itemclick = new EventEmitter<any>();

  constructor(
    private loadingController:LoadingController,
    private router:Router,
    private modalController:ModalController, 
    private toast:ToastMessageService,
    private cusHttp:CustomHttp) { }

  ngOnInit() {
    this.loadData(null)
  }

  async loadData(ev){ 
    let sort_type = '';
    if(ev == null){
      sort_type = 'all';
    }else{
      sort_type = ev.detail.value;
    }
    this.out_loading.emit({isLoading:true});
    this.cusHttp.get(`template/list?sort_type=${sort_type}`)
    .subscribe((snap:any)=>{
      this.out_loading.emit({isLoading:false});
      this.template_data = snap.data;
      console.log(JSON.stringify(snap));
      if(this.isProjectViewed){
        this.template_data = this.template_data.slice(0,4);
      }
      this.template_data.forEach(()=>{this.guestHighLightTemplates.push(false)})
    },err=>{
      this.toast.presentToast(this.cusHttp.httpErrRes(err));
    })
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

  cTemplate(item){
    if(!this.isGuestChooseTemplate){
      this.onPreview(item);
    }else{
      this.guestHighLightTemplates = new Array();
      if(item != this.guestTemplateChoosed){
        this.template_data.forEach((el)=>{this.guestHighLightTemplates.push(item == el ? true :false)})
        this.guestTemplateChoosed = item;
      }else{
        this.guestTemplateChoosed = null;
      } 
      this.out_itemclick.emit({guestTemplateChoosed:this.guestTemplateChoosed});
    }
  }
}
