import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular'; 
import {  SplashScreenController } from 'src/app/InteractivePackage/splash-screen/splash-screen.component';
import { CryptService } from 'src/app/utils/crypt.service';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { IonPopOverListComponent } from 'src/app/utils/ion-pop-over-list/ion-pop-over-list.component';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
import { ConnectFbPageComponent } from '../connect-fb-page/connect-fb-page.component' ;

declare var $:any;
@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss'],
})
export class ListProjectComponent implements OnInit { 

  projects = new Array(); 
  constructor(
    private router:Router,
    private splCtrl :SplashScreenController,
    private loadingController:LoadingController,
    private popCtrl:PopoverController, 
    private modalController:ModalController,
    private alertController:AlertController,
    private toast:ToastMessageService,
    private route: ActivatedRoute,
    private cusHttp:CustomHttp
  ) { 
    route.url.subscribe((url:any) =>{
      this.splCtrl.show(); 
      this.initProjects(); 
    }); 
  }
 
  ngOnInit() {  
  }

  isLoading = false;
  nextPage = '';
  initProjects() { 
    this.cusHttp.get('project/list')
    .subscribe((snap:any)=>{   
      this.splCtrl.dismiss();
      console.log(snap);
      this.nextPage = snap.nextPage;
      if(snap.data.length == 0){
        return;
      }
      this.projects = snap.data;
    },err=>{    
      this.toast.presentToast(this.cusHttp.httpErrRes(err));
    })
  }

  loadData(scroll){ 
    if(this.nextPage ==''){
      scroll.target.complete();
      return;
    }
    this.cusHttp.get(this.nextPage)
    .subscribe((snap:any)=>{ 
      scroll.target.complete();
      this.nextPage = snap.nextPage;
      console.log(snap);
      if(snap.data.length == 0){
        return;
      }
      this.projects = this.projects.concat(snap.data);
    },err=>{  
      console.log(err);
      this.toast.presentToast(this.cusHttp.httpErrRes(err));
    });
  }

  async onConnect(p){  
    const modal = await this.modalController.create({
      component: ConnectFbPageComponent,
      backdropDismiss:false, 
      componentProps:{
        project_id:p.project_id
      }
    });
    await modal.present();
    await modal.onDidDismiss()
    .then((snap:any)=>{
      const data = snap.data;
      console.log(data);
      if(!data){
        return;
      }
      if(data.isConnect){
        this.initProjects();
      }
    })
  }

  async onClickItemMenu(item,ev){
    console.log(item);
    const popover = await this.popCtrl.create({
      component: IonPopOverListComponent ,  
      event: ev ,
      componentProps:{
        buttons:['Duplicate','Rename','Delete']
      }
    });
    await popover.present(); 
    popover.onDidDismiss().then(async (snap)=>{
      console.log(snap);
      const data = snap.data; 
      if(!data){return;}
      console.log(data);
      switch(data.name){
        case "Duplicate":
          var alert = await this.alertController.create({ 
            header: 'Duplicate',
            message: 'Do you want to <strong>duplicate</strong> this project?',
            buttons: [
              {
                text: 'Cancel', 
              }, {
                text: 'Yes',
                handler: async () => {  
                  var loading = await  this.loadingController.create({ message: "Please wait ...."  });
                  await loading.present(); 
                  
                  this.cusHttp.post(`project/delete?project_id=${item.project_id}`,{})
                  .subscribe(async (snap:any)=>{
                    loading.dismiss();   
                    this.projects.splice(this.projects.indexOf(item),1);
                  },async (err)=>{   
                    this.toast.presentToast(this.cusHttp.httpErrRes(err));
                  }); 
                }
              }
            ]
          }); 
          await alert.present(); 
          break;
          
        case "Rename":
          const alert1 = await this.alertController.create({
            cssClass: 'alert-input',  
            header: 'Project name',
            inputs: [ 
              { 
                type: 'text',
                name:"newname",
                id: 'txt1',  
                value:item.name,
                placeholder: 'New name'
              } 
            ],
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (data) => {
                  console.log(data);
                }
              }, {
                text: 'rename',
                handler: async (data) => {
                  const newName = data.newname;
                  if(newName == item.name){return;}
                  var loading = await  this.loadingController.create({ message: "Please wait ...."  });
                  await loading.present(); 
                  
                  this.cusHttp.put(`project/rename?project_id=${item.project_id}&name=${newName}`,{})
                  .subscribe(async (snap:any)=>{
                    loading.dismiss();
                    Object.assign(item,{name:newName});
                    console.log(item);
                  },async (err)=>{   
                    this.toast.presentToast(this.cusHttp.httpErrRes(err));
                  });
                }
              }
            ]
          });
          await alert1.present(); 
          break;
          
        case "Delete":
          var alert = await this.alertController.create({ 
            header: 'Delete',
            message: 'Do you want to <strong>delete</strong> this project?',
            buttons: [
              {
                text: 'Cancel', 
              }, {
                text: 'Yes',
                handler: async () => {  
                  var loading = await  this.loadingController.create({ message: "Please wait ...."  });
                  await loading.present(); 
                  
                  this.cusHttp.del(`project/delete?project_id=${item.project_id}`)
                  .subscribe(async (snap:any)=>{
                    loading.dismiss();   
                    this.projects.splice(this.projects.indexOf(item),1);
                  },async (err)=>{   
                    this.toast.presentToast(this.cusHttp.httpErrRes(err));
                  }); 
                }
              }
            ]
          }); 
          await alert.present(); 
          break;
      }
    });
  }
 

  async onBlankProj(){
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    
    this.cusHttp.post('project/create',{})
    .subscribe(async (snap:any)=>{
      await loading.dismiss(); 
      console.log(snap); 
      this.projects.unshift(snap);
    },async(err)=>{ 
      await loading.dismiss(); 
      this.toast.presentToast(this.cusHttp.httpErrRes(err));
    }) ;
  }
}
